import { View, Text, StyleSheet, Appearance, ColorSchemeName } from 'react-native'
import React, { useEffect, useState } from 'react'



/* useEffect(() => {
  const appearanceChange = Appearance.addChangeListener(
    ({colorScheme}) => {
      setTheme(colorScheme);
    },
  );
  return () => appearanceChange.remove();
}, []);
 */

const Switches = () => {
  const [theme, setTheme] = useState<ColorSchemeName>(Appearance.getColorScheme());
  return (
    <View>
      <Text>Switches</Text>
    </View>
  )
}

export default Switches;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      height: 60,
    },
    switchLabel: {
      flex: 4,
      fontSize: 20,
      margin: 10,
    },
    switch: {
      flex: 1,
      margin: 10,
    },
  });
  