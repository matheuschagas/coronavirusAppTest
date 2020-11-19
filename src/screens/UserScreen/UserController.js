import React, {useEffect} from 'react';
import {UserComponent} from './UserComponent';
import {UserService} from '../../services/UserService';
import {StorageService} from '../../services/StorageService';

export const UserController = (props) => {
  const getUsers = async () => {
    //await StorageService.remove('@users');
    console.log(await UserService.get());
  };
  useEffect(() => {
    getUsers();
  }, []);
  return <UserComponent />;
};
