import { View, Text } from 'react-native'
import React, { Children, createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

  const [themeName, setThemeName] = useState('light');

  
    useEffect(() => {
      _readTheme();
    }, []);
  
    const _readTheme = async() => {
      const storedTheme = await AsyncStorage.getItem('theme');
      console.log(storedTheme);
      if(storedTheme === 'dark' || storedTheme === 'light') {
        setThemeName(storedTheme);
      }
    };


  const lightTheme = {
    background: '#fafafa',
    text: '#121212',
  };

  const darkTheme = {
    background: '#121212',
    text: '#fafafa',
  }

  const toggleTheme = async() => {
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  }

  const theme = themeName === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{themeName, toggleTheme, theme}}>
      {children}
    </ThemeContext.Provider>
  )
}



