import React from 'react';
import {
  Container,
  Form,
  Item,
  Input,
  Content,
  Header,
  Body,
  Title,
  Label,
  Button,
  Text,
  Icon,
  Spinner,
} from 'native-base';

export const AddUserComponent = (props) => {
  return (
    <Container>
      <Header>
        <Body>
          <Title>Add User</Title>
        </Body>
      </Header>
      <Content padder>
        <Form>
          <Item floatingLabel>
            <Label>Name</Label>
            <Input
              value={props.name}
              returnKeyType={'next'}
              onChangeText={props.setName}
            />
          </Item>
          <Item floatingLabel>
            <Label>Phone</Label>
            <Input
              returnKeyType={'next'}
              keyboardType={'phone-pad'}
              value={props.phone}
              onChangeText={props.setPhone}
            />
          </Item>
          <Item floatingLabel>
            <Label>Age</Label>
            <Input
              returnKeyType={'next'}
              keyboardType={'number-pad'}
              value={props.age}
              onChangeText={props.setAge}
            />
          </Item>
          <Item floatingLabel>
            <Label>Address</Label>
            <Icon
              type="FontAwesome"
              onPress={props.navigateToMap}
              name="map"
              style={{color: 'blue'}}
            />
            <Input
              returnKeyType={'next'}
              value={props.address}
              onChangeText={props.setAddress}
            />
          </Item>
          <Item floatingLabel>
            <Label>Symptoms</Label>
            <Input
              returnKeyType={'done'}
              value={props.symptoms}
              onChangeText={props.setSymptoms}
            />
          </Item>
        </Form>
      </Content>
      <Button
        onPress={props.add}
        block
        style={{marginHorizontal: 10, marginVertical: 20}}>
        {props.loading && <Spinner />}
        <Text>Add</Text>
      </Button>
    </Container>
  );
};
