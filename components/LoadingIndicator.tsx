import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import type { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<any>;
};

export function useTransitionLoading(navigation: NavigationProp<any>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeStart = navigation.addListener('transitionStart', () => {
      setLoading(true);
    });
    const unsubscribeEnd = navigation.addListener('transitionEnd', () => {
      setLoading(false);
    });

    return () => {
      unsubscribeStart();
      unsubscribeEnd();
    };
  }, [navigation]);

  return loading;
}

const LoadingIndicator: React.FC = () => (
  <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
    <BallIndicator size={40} color="#ff5a5f" />
  </View>
);

export default LoadingIndicator;