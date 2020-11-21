import React, {useRef, useEffect} from 'react';
import {Icon, Text, H3} from 'native-base';
import {SafeAreaView, View, Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';

/*
The use of TouchableOpacity from react-native-gesture-handle is a workaround
because there is an issue at react-native-maps:
https://github.com/react-native-maps/react-native-maps/issues/2780
*/

export const DetailsComponent = (props) => {
  const markerRef = useRef();
  useEffect(() => {
    //check if placeName updated and show callout on map marker
    //the timeout is a workaround related to a issue on react-native-maps
    if (markerRef.current) {
      markerRef.current.hideCallout();
      setTimeout(() => {
        markerRef.current.showCallout();
      }, 100);
    }
  }, [props.placeName]);
  return (
    <View style={{flex: 1}}>
      {props.initialPinCoordinates.latitude && (
        <MapView
          style={{
            flex: 1,
          }}
          provider={PROVIDER_GOOGLE}
          initialRegion={props.initialPinCoordinates}>
          <Marker
            ref={markerRef}
            coordinate={props.initialPinCoordinates}
            draggable={!props.user}
            onDragStart={() => {
              props.resetPlaceName();
            }}
            onDragEnd={(e) => {
              props.getPlaceName({
                lat: e.nativeEvent.coordinate.latitude,
                lon: e.nativeEvent.coordinate.longitude,
              });
            }}>
            <Callout>
              <View>
                {props.user && (
                  <H3>{`${props.user[1].name} - ${props.user[1].age}y`}</H3>
                )}
                <Text>
                  {props.user
                    ? `${props.user[1].phone}\n${props.placeName}\n\n${props.user[1].symptoms}`
                    : props.placeName}
                </Text>
              </View>
            </Callout>
          </Marker>
        </MapView>
      )}
      <SafeAreaView style={{position: 'absolute', top: 0, left: 0}}>
        <TouchableOpacity style={{padding: 10}} onPress={props.goBack}>
          <Icon name="arrow-back" />
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView
        style={{
          position: 'absolute',
          bottom: 15,
          width: '100%',
        }}>
        <TouchableOpacity
          disabled={props.placeName === 'Loading...'}
          onPress={() => {
            props.goBack(true);
          }}
          style={{
            alignSelf: 'center',
            width: '90%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              props.placeName === 'Loading...' ? 'rgba(0,0,0,0.5)' : 'black',
            paddingVertical: 15,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white'}}>Done</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
