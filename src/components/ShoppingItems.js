import React from 'react';
import {List} from 'native-base';

import ShoppingItem from './ShoppingItem';
export default function ShoppingItems({items, onItemPress}) {
  return items.map(item => {
    return (
      <List>
        <ShoppingItem key={item.id} item={item} onItemPress={onItemPress} />
      </List>
    );
  });
}
