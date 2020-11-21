import React, {useEffect, useState} from 'react';
import {UserComponent} from './UserComponent';
import {UserService} from '../../services/UserService';
import {StorageService} from '../../services/StorageService';

export const UserController = (props) => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    //await StorageService.remove('@users');
    setUsers(await UserService.get());
  };
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getUsers();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    getUsers();
  }, []);

  const openDetails = (user) => {
    props.navigation.navigate('Details', {user});
  };
  return <UserComponent users={users} openDetails={openDetails} />;
};
