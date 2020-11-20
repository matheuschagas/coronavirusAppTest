import React, {useRef, useEffect} from 'react';
import {Icon, Text} from 'native-base';
import {SafeAreaView, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

/*
The use of TouchableOpacity from react-native-gesture-handle is a workaround
because there is an issue at react-native-maps:
https://github.com/react-native-maps/react-native-maps/issues/2780
*/

export const DetailsComponent = (props) => {
  const markerRef = useRef();
  useEffect(() => {
    markerRef.current.showCallout();
  }, [props.pinCoordinates]);
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{
          flex: 1,
          zIndex: -1,
        }}
        loadingEnabled
        provider={PROVIDER_GOOGLE}
        region={props.pinCoordinates}>
        <Marker
          style={{zIndex: -1}}
          ref={markerRef}
          coordinate={props.initialPinCoordinates}
          draggable={!props.user}
          title={
            props.user
              ? `${props.user[1].name} - ${props.user[1].age}`
              : undefined
          }
          description={
            props.user
              ? `${props.user[1].phone}\n${props.placeName}\n\n${props.user[1].symptoms}`
              : props.placeName
          }
          onDragStart={() => {
            props.resetPlaceName();
          }}
          onDragEnd={(e) => {
            props.getPlaceName({
              lat: e.nativeEvent.coordinate.latitude,
              lon: e.nativeEvent.coordinate.longitude,
            });
          }}
        />
      </MapView>
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
