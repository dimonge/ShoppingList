import React from 'react';
import {Keyboard} from 'react-native';
import {Item, Input, Button, Icon} from 'native-base';
export default function AddItem({value, onChangeText, onAddItemPress}) {
  function onAddItemPressWithKeyboardDismiss(event) {
    if (event && event.nativeEvent && event.nativeEvent.key === 'Enter') {
      onAddItemPress();
      Keyboard.dismiss();
    }
  }
  return (
    <Item rounded>
      <Input
        placeholder="Add item"
        multiline
        onKeyPress={onAddItemPressWithKeyboardDismiss}
        onChangeText={onChangeText}
        value={value}
      />

      <Button rounded onPress={onAddItemPress} primary>
        <Icon name="add" />
      </Button>
    </Item>
  );
}
