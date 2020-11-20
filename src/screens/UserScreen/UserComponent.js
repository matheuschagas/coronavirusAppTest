import React from 'react';
import {
  Body,
  Container,
  Header,
  Title,
  Content,
  List,
  ListItem,
  Text,
} from 'native-base';

export const UserComponent = (props) => {
  const renderRow = (item) => {
    return (
      <ListItem
        onPress={() => {
          props.openDetails(item);
        }}>
        <Text>{`${item[1].address.country_code} - ${item[1].name} - ${item[1].age}`}</Text>
      </ListItem>
    );
  };
  return (
    <Container>
      <Header>
        <Body>
          <Title>Users</Title>
        </Body>
      </Header>
      <List
        dataArray={props.users}
        renderRow={renderRow}
        keyExtractor={(index) => index.toString()}
      />
    </Container>
  );
};
