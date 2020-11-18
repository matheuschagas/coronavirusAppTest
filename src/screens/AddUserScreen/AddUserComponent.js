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
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Phone</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Age</Label>
            <Input />
          </Item>
          <Item floatingLabel>
            <Label>Address</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Symptoms</Label>
            <Input />
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
