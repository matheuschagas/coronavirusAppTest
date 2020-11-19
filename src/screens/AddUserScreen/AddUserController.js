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

export const AddUserController = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [fullAddress, setFullAddress] = useState({});
  const [symptoms, setSymptoms] = useState('');
  const [geolocationGranted, setGeolocationGranted] = useState(false);

  const askGeolocationPermission = () => {
    let permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    check(permission)
      .then((result) => {
        switch (result) {
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((res) => {
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
      .catch((error) => {});
  };

  useEffect(() => {
    askGeolocationPermission();
  }, []);

  //Add a user, reset the form info and navigate to User tab
  const add = async () => {
    ///TODO add a loader
    try {
      let geoAddress = fullAddress;
      if (!fullAddress.latitude) {
        console.log(address);
        geoAddress = await GeolocationService.getCoordinates(address);
      }
      console.log(geoAddress);
      await UserService.add(name, phone, age, geoAddress, symptoms);
      setName('');
      setPhone('');
      setAge('');
      setAddress('');
      setFullAddress({});
      setSymptoms('');
      props.navigation.navigate('Users');
    } catch (e) {
      Alert.alert('Ops!', e.message);
    }
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
      geolocationGranted={geolocationGranted}
    />
  );
};
