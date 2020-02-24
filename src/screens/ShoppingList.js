import React, {useState} from 'react';
import {Keyboard} from 'react-native';
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
  Left,
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
    value: '',
  });
  function onItemClick(item) {
    if (state.products) {
      setState({
        products: state.products.map(p => {
          if (p.id === item.id) {
            return {...item, gotten: !item.gotten};
          }
          return p;
        }),
      });
    }
  }

  function onAddItemPress() {
    if (!!state.value.trim().length > 0) {
      setState({
        products: state.products.concat({
          id: state.products.length + 1,
          name: state.value.trim(),
          gotten: false,
        }),
        value: '',
      });
    }
  }

  function onAddItemPressWithKeyboardDismiss(event) {
    if (event && event.nativeEvent && event.nativeEvent.key === 'Enter') {
      onAddItemPress();
      Keyboard.dismiss();
    }
  }
  const items = state.products.map(item => {
    return (
      <ListItem key={item.id} onPress={() => onItemClick(item)}>
        <Body>
          <Text style={{color: item.gotten ? '#bbb' : '#000'}}>
            {item.name}
          </Text>
        </Body>
        <Right>
          <CheckBox
            radius
            checked={item.gotten}
            onPress={() => onItemClick(item)}
          />
        </Right>
      </ListItem>
    );
  });
  console.log('Items', state.products);
  return (
    <Container style={{paddingBottom: 20}}>
      <Content>
        <List>{items}</List>
      </Content>

      <Item rounded>
        <Input
          placeholder="Add item"
          multiline
          onKeyPress={onAddItemPressWithKeyboardDismiss}
          onChangeText={value => setState({...state, value})}
          value={state.value}
        />

        <Button rounded onPress={onAddItemPress}>
          <Icon name="add" />
        </Button>
      </Item>
    </Container>
  );
}
