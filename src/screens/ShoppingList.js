import React, {useState, useEffect} from 'react';
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

import AsyncStorage from '@react-native-community/async-storage';

const storeKey = '@thevinelabs_shoppinglist_products';
async function addProductsToLocalStore(products) {
  try {
    await AsyncStorage.setItem(storeKey, JSON.stringify(products));
  } catch (e) {
    console.log(e);
  }
}

async function getProductsFromLocalStore() {
  try {
    const products = await AsyncStorage.getItem(storeKey);

    if (!!products) {
      return JSON.parse(products);
    } else {
      return [];
    }
  } catch (e) {
    console.log(e);
  }
}
export default function ShoppingList() {
  const [state, setState] = useState({
    products: [],
    value: '',
  });

  useEffect(() => {
    async function getProducts() {
      const products = await getProductsFromLocalStore();
      if (!!products) {
        setState({
          products,
        });
      }
    }
    getProducts();
  }, []);
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

  async function onAddItemPress() {
    if (!!state.value.trim().length > 0) {
      const products = state.products.concat({
        id: state.products.length + 1,
        name: state.value.trim(),
        gotten: false,
      });

      await addProductsToLocalStore(products);
      setState({
        products,
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
