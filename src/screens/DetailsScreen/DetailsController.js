import React, {useState, useEffect} from 'react';
import {DetailsComponent} from './DetailsComponent';
import Geolocation from 'react-native-geolocation-service';
import {GeolocationService} from '../../services/GeolocationService';
import _ from 'lodash';

export const DetailsController = (props) => {
  const [pinCoordinates, setPinCoordinates] = useState({});
  const [initialPinCoordinates, setInitialPinCoordinates] = useState({});
  const [placeName, setPlaceName] = useState('Loading...');
  const [geolocation, setGeolocation] = useState({});
  useEffect(() => {
    getCoordinates();
  }, []);

  const getPlaceName = _.debounce(async ({lat, lon}) => {
    setPinCoordinates({
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
    let coords = await GeolocationService.getAddress({
      lat,
      lon,
    });
    setPlaceName(coords.label);
    setGeolocation(coords);
  }, 1000);

  const getCoordinates = () => {
    Geolocation.getCurrentPosition(
      async (info) => {
        setInitialPinCoordinates({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
        getPlaceName({lat: info.coords.latitude, lon: info.coords.longitude});
      },
      (err) => {
        console.log(err);
      },
      {
        maximumAge: 1000,
        timeout: 5000,
        distanceFilter: 10,
      },
    );
  };
  const goBack = (done = false) => {
    if (done) {
      props.navigation.navigate('Add User', {geolocation});
    } else {
      props.navigation.goBack();
    }
  };
  const resetPlaceName = () => {
    setPlaceName('Loading...');
  };
  return (
    <DetailsComponent
      goBack={goBack}
      placeName={placeName}
      pinCoordinates={pinCoordinates}
      initialPinCoordinates={initialPinCoordinates}
      resetPlaceName={resetPlaceName}
      getPlaceName={getPlaceName}
      setPinCoordinates={setPinCoordinates}
    />
  );
};
