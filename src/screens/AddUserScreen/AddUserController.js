import React, {useState, useEffect} from 'react';
import {AddUserComponent} from './AddUserComponent';
import {UserService} from '../../services/UserService';
import {Alert, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
  request,
} from 'react-native-permissions';
import {GeolocationService} from '../../services/GeolocationService';
import Geolocation from 'react-native-geolocation-service';

export const AddUserController = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [fullAddress, setFullAddress] = useState({});
  const [symptoms, setSymptoms] = useState('');
  const [geolocationGranted, setGeolocationGranted] = useState(false);
  const [loading, setLoading] = useState(false);

  const askGeolocationPermission = () => {
    let permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    check(permission)
      .then((result) => {
        switch (result) {
          case RESULTS.DENIED:
            request(permission).then((res) => {
              if (res === RESULTS.GRANTED) {
                setGeolocationGranted(true);
              }
            });
            break;
          case RESULTS.GRANTED:
            setGeolocationGranted(true);
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (props.route.params?.geolocation) {
      setFullAddress(props.route.params.geolocation);
      setAddress(props.route.params.geolocation.label);
    }
  }, [props.route.params?.geolocation]);

  const getCoordinates = () => {
    Geolocation.getCurrentPosition(
      async (info) => {
        let coords = await GeolocationService.getAddress({
          lat: info.coords.latitude,
          lon: info.coords.longitude,
        });
        setFullAddress(coords);
        setAddress(coords.label);
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

  useEffect(() => {
    askGeolocationPermission();
  }, []);

  //Add a user, reset the form info and navigate to User tab
  const add = async () => {
    if (!loading) {
      setLoading(true);
      try {
        let geoAddress = fullAddress;
        if (
          (geoAddress.latitude === undefined || geoAddress.latitude === null) &&
          address.length > 0
        ) {
          geoAddress = await GeolocationService.getCoordinates(address);
        }
        await UserService.add(name, phone, age, geoAddress, symptoms);
        setName('');
        setPhone('');
        setAge('');
        setAddress('');
        setFullAddress({});
        setSymptoms('');
        props.navigation.navigate('Users');
      } catch (e) {
        Alert.alert('Oops!', e.message);
      }
      setLoading(false);
    }
  };

  const navigateToMap = () => {
    props.navigation.navigate('Details', {geolocationGranted});
  };
  return (
    <AddUserComponent
      name={name}
      setName={setName}
      phone={phone}
      setPhone={setPhone}
      age={age}
      setAge={setAge}
      address={address}
      setAddress={setAddress}
      symptoms={symptoms}
      setSymptoms={setSymptoms}
      add={add}
      navigateToMap={navigateToMap}
      loading={loading}
    />
  );
};
