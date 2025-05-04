import { View, Text, Button } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

type ButtonProps = {
    label: string;
    onPress: () => void;
    disabled: boolean;
    isDisabledCondition: boolean;
}


const CounterButton = ({label, onPress, disabled=false, isDisabledCondition=false}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        { 
            width: 32,
            height: 32,
            borderRadius: 16,
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        { borderColor: isDisabledCondition ? 'lightgrey' : 'grey' },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          {fontSize: 18},
          isDisabledCondition ? { color: 'lightgrey' } : { color: 'grey', fontWeight: 'bold' },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default CounterButton