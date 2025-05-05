import { View, Text } from 'react-native'
import React, { Children, createContext, useState } from 'react'

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

  const [themeName, setThemeName] = useState('light');


  const lightTheme = {
    background: '#fafafa',
    text: '#121212',
  };

  const darkTheme = {
    background: '#121212',
    text: '#fafafa',
  }

  const toggleTheme = () => {
    setThemeName(prev => (prev === 'light' ? 'dark' : 'light'));
  }

  const theme = themeName === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{themeName, toggleTheme, theme}}>
      {children}
    </ThemeContext.Provider>
  )
}



