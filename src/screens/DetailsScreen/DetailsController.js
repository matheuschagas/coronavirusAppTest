import React, {useState, useEffect} from 'react';
import {DetailsComponent} from './DetailsComponent';
import Geolocation from 'react-native-geolocation-service';
import {GeolocationService} from '../../services/GeolocationService';
import _ from 'lodash';

export const DetailsController = (props) => {
  const [pinCoordinates, setPinCoordinates] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [initialPinCoordinates, setInitialPinCoordinates] = useState({});
  const [placeName, setPlaceName] = useState('Loading...');
  const [geolocation, setGeolocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const user = props.route.params?.user;
  useEffect(() => {
    if (user) {
      let coords = {
        latitude: user[1].address.latitude,
        longitude: user[1].address.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      setInitialPinCoordinates(coords);
      setPinCoordinates(coords);
      setGeolocation(coords);
      setPlaceName(user[1].address.label);
    } else {
      getCoordinates();
    }
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
    const withoutGeolocation = () => {
      setInitialPinCoordinates({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
      getPlaceName({lat: 0, lon: 0});
    };
    if (props.route.params?.geolocationGranted) {
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
          withoutGeolocation();
        },
        {
          maximumAge: 1000,
          timeout: 5000,
          distanceFilter: 10,
        },
      );
    } else {
      withoutGeolocation();
    }
  };
  const goBack = (done = false) => {
    if (done && !user) {
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
      user={user}
    />
  );
};
