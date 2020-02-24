import React from 'react';
import {ListItem, Body, Right, CheckBox, Text} from 'native-base';
export default function ShoppingItem({item, onItemPress}) {
  if (!item) {
    return <Text>No item listed</Text>;
  }
  return (
    <ListItem onPress={() => onItemPress(item)}>
      <Body>
        <Text style={{color: item.gotten ? '#bbb' : '#000'}}>{item.name}</Text>
      </Body>
      <Right>
        <CheckBox
          radius
          checked={item.gotten}
          onPress={() => onItemPress(item)}
        />
      </Right>
    </ListItem>
  );
}
