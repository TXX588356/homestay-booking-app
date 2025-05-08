import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';


interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, value, onChangeText }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
  
    return (
      <View style={{
        marginBottom: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dddddd'}}>
        <TextInput
          style={{width: '100%'}}
          placeholder={placeholder}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 16,
            height: 50,
            justifyContent: 'center',}}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        >
          <Ionicons
            name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>
    );
  };

export default PasswordInput;