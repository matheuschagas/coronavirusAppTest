import React, {useState, useEffect} from 'react';
import {AddUserComponent} from './AddUserComponent';

export const AddUserController = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [symptoms, setSymptoms] = useState('');

  const add = async () => {};
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
