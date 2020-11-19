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
            <Input value={props.name} onChangeText={props.setName} />
          </Item>
          <Item floatingLabel>
            <Label>Phone</Label>
            <Input value={props.phone} onChangeText={props.setPhone} />
          </Item>
          <Item floatingLabel>
            <Label>Age</Label>
            <Input value={props.age} onChangeText={props.setAge} />
          </Item>
          <Item floatingLabel>
            <Label>Address</Label>
            <Icon
              type="FontAwesome"
              onPress={() => {
                if (props.geolocationGranted) {
                  props.getCoordinates();
                }
              }}
              name="location-arrow"
              style={{color: props.geolocationGranted ? 'blue' : 'black'}}
            />
            <Input value={props.address} onChangeText={props.setAddress} />
          </Item>
          <Item floatingLabel last>
            <Label>Symptoms</Label>
            <Input value={props.symptoms} onChangeText={props.setSymptoms} />
          </Item>
        </Form>
      </Content>
      <Button
        onPress={props.add}
        block
        style={{marginHorizontal: 10, marginVertical: 20}}>
        <Text>Add</Text>
      </Button>
    </Container>
  );
};
