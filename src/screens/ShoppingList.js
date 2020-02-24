import React, {useState, useEffect} from 'react';
import {Container, Content} from 'native-base';

import {
  getProductsFromLocalStore,
  addProductsToLocalStore,
} from '../store/localstorage';

import ShoppingItems from '../components/ShoppingItems';
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

  console.log('Shopping Products', state.products);
  return (
    <Container style={{paddingBottom: 20}}>
      <Content>
        <ShoppingItems items={state.products} onItemPress={onItemPress} />
      </Content>
      <AddItem
        onAddItemPress={onAddItemPress}
        onChangeText={value => setState({...state, value})}
        value={state.value}
      />
    </Container>
  );
}
