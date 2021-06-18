import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Qty = ({onPress, valueCount = 1}) => {
  const [value, setValue] = useState(valueCount);

  const decrement = () => {
    if (value === 1) {
      setValue(1);
      onPress(1);
    } else {
      onPress(value - 1, 'minus');
      setValue(value - 1);
    }
  };

  const increment = () => {
    onPress(parseInt(value) + 1, 'plus');
    setValue(parseInt(value) + 1);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
      }}>
      <Icon name={'minus'} size={18} onPress={() => decrement()} />
      <Text style={{fontSize: 18, paddingHorizontal: 10}}>{valueCount}</Text>
      <Icon name={'plus'} size={18} onPress={() => increment()} />
    </View>
  );
};

export default Qty;
