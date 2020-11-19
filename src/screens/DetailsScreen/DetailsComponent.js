import React from 'react';
import {
  Body,
  Container,
  Header,
  Title,
  Content,
  Left,
  Button,
  Icon,
  Right,
  Text,
} from 'native-base';
import {SafeAreaView} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export const DetailsComponent = (props) => {
  return (
    <Container>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          ...props.pinCoordinates,
        }}>
        <Marker
          ref={(ref) => {
            if (ref) {
              ref.showCallout();
            }
          }}
          coordinate={props.pinCoordinates}
          draggable
          onDragStart={props.resetPlaceName}
          description={props.placeName}
          onDragEnd={(e) => {
            props.getPlaceName({
              lat: e.nativeEvent.coordinate.latitude,
              lon: e.nativeEvent.coordinate.longitude,
            });
          }}
        />
      </MapView>

      <SafeAreaView style={{position: 'absolute', top: 0, left: 0}}>
        <Button transparent onPress={props.goBack}>
          <Icon name="arrow-back" />
        </Button>
      </SafeAreaView>
      <Button
        block
        style={{
          position: 'absolute',
          bottom: 15,
          alignSelf: 'center',
          width: '90%',
        }}>
        <Text>Done</Text>
      </Button>
    </Container>
  );
};
