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

import {
  getProductsFromLocalStore,
  addProductsToLocalStore,
} from '../store/localstorage';

import ShoppingItem from '../components/ShoppingItem';
import AddItem from '../components/AddItem';
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
  function onItemPress(item) {
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
    return <ShoppingItem key={item.id} item={item} onItemPress={onItemPress} />;
  });
  console.log('Items', state.products);
  return (
    <Container style={{paddingBottom: 20}}>
      <Content>
        <List>{items}</List>
      </Content>
      <AddItem
        onAddItemPress={onAddItemPress}
        onChangeText={value => setState({...state, value})}
        value={state.value}
      />
    </Container>
  );
}
