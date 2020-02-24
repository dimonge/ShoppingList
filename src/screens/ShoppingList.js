import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  Container,
  List,
  Content,
  ListItem,
  Body,
  Text,
  Right,
  CheckBox,
  Icon,
  Fab,
  Item,
  Input,
  Button,
} from 'native-base';

export default function ShoppingList() {
  const [state, setState] = useState({
    products: [
      {id: 1, name: 'bread', gotten: true},
      {id: 2, name: 'eggs', gotten: false},
    ],
  });
  function onItemClick(item) {
    setState({
      products: state.products.map(p => {
        if (p.id === item.id) {
          return {...item, gotten: !item.gotten};
        }
        return p;
      }),
    });
  }

  function onAddItem() {}
  const items = state.products.map(item => {
    return (
      <ListItem key={item.id} onPress={() => onItemClick(item)}>
        <Body>
          <Text style={{color: item.gotten ? '#bbb' : '#000'}}>
            {item.name}
          </Text>
        </Body>
        <Right>
          <CheckBox checked={item.gotten} onPress={() => onItemClick(item)} />
        </Right>
      </ListItem>
    );
  });
  return (
    <Container style={{paddingBottom: 20}}>
      <Content>
        <List>{items}</List>
      </Content>
      <Item rounded>
        <Input placeholder="Rounded Textbox" />
        <Button>
          <Icon name="add" />
        </Button>
      </Item>
    </Container>
  );
}
