import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { ExternalStyles } from '../Styles';

type Props = {
  color?: string;
  size?: number;
};

const BackButton =({color, size}: Props) => {
  const navigation = useNavigation();

  const iconColor = 'white';
  const iconSize = 24;

  return (
    <TouchableOpacity
      style={ExternalStyles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};


export default BackButton;