import React, {useState, useEffect} from 'react';
import {AddUserComponent} from './AddUserComponent';
import {UserService} from '../../services/UserService';
import {Alert} from 'react-native';

export const AddUserController = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [symptoms, setSymptoms] = useState('');

  //Add a user, reset the form info and navigate to User tab
  const add = async () => {
    ///TODO add a loader
    try {
      await UserService.add(name, phone, age, address, symptoms);
      setName('');
      setPhone('');
      setAge('');
      setAddress('');
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
    />
  );
};
