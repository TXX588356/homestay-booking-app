import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { ExternalStyles } from '../Styles';
import CounterButton from './CounterButton';
import ThemedText from './ThemedText';
import { ThemeContext } from '../util/ThemeManager';

interface GuestType {
  label: string;
  count: number;
  min: number;
  max: number;
  description: string;
}

type GuestSelectorProps = {
  onGuestsChange?: (guests: { adults: number; children: number; infants: number }) => void;
}

const GuestSelector= ({ onGuestsChange }: GuestSelectorProps) => {
  const { theme } = useContext(ThemeContext);
  const [guestTypes, setGuestTypes] = useState([
    { label: 'Adults', count: 1, min: 1, max: 5, description: 'Ages 13 or above' },
    { label: 'Children', count: 0, min: 0, max: 5, description: 'Ages 2-12' },
    { label: 'Infants', count: 0, min: 0, max: 2, description: 'Under 2' },
  ]);

  const handleCountChange = (index: number, increment: boolean) => {
    const updated = guestTypes.map((type, i) => {
      if (i !== index) return type;
      const newCount = increment
        ? Math.min(type.max, type.count + 1)
        : Math.max(type.min, type.count - 1);
      return { ...type, count: newCount };
    });
  
    setGuestTypes(updated);
  
    if (onGuestsChange) {
      onGuestsChange({
        adults: updated[0].count,
        children: updated[1].count,
        infants: updated[2].count,
      });
    }
  };

  return (
    <View style={[ExternalStyles.container,{backgroundColor: theme.background}]}>
      {guestTypes.map((guestType, index) => (
        <View key={guestType.label} style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
          }}>
          <View>
            <ThemedText style={ExternalStyles.label}>{guestType.label}</ThemedText>
              <ThemedText style={{fontSize: 12}}>{guestType.description}</ThemedText>
          </View>
          <View style={{ flexDirection: 'row',alignItems: 'center',}}>
          <CounterButton
              label="-"
              onPress={()=> handleCountChange(index,false)}
              disabled={guestType.count <= guestType.min}
              isDisabledCondition={guestType.count <= guestType.min}
          />
            <ThemedText style={{marginHorizontal: 15, fontWeight: 'bold'}}>{guestType.count}</ThemedText>
           <CounterButton
              label="+"
              onPress={()=> handleCountChange(index,true)}
              disabled={guestType.count >= guestType.max}
              isDisabledCondition={guestType.count >= guestType.max}
              
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default GuestSelector; 