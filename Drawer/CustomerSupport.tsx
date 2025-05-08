import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  View,
  ActivityIndicator
} from 'react-native';
import { ExternalStyles } from '../Styles'
import { ThemeContext } from '../util/ThemeManager'
import io from 'socket.io-client';
import config from '../config';
import ThemedText from '../components/ThemedText';
import AsyncStorage from '@react-native-async-storage/async-storage';

var socket = io(`${config.settings.livechatServerPath}/chat`, {
    transports: ['websocket'],
});

const CustomerSupport = () => {
    const { theme } = useContext(ThemeContext);
  
  const [name, setName] = useState('User');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [chatroom, setChatroom] = useState('');

  const fetchUserToSetName = async() => {
    try{
      setLoading(true);
      const userDataString = await AsyncStorage.getItem('currentUser');

      if(userDataString) {
        const userData = JSON.parse(userDataString);
        setName(userData.name);
      }
    }catch(error){
      console.error("Error in fetching user data: ", error);
    }finally{
      setLoading(false);
    }
  }
    
  useEffect(() => {
    fetchUserToSetName();

    socket.on('connect', () => {
      console.log(socket.id);
      socket.emit('mobile_client_connected', { connected: true }, (response) => {
        console.log(response);
      });
      ToastAndroid.show('Connected to server', ToastAndroid.LONG);
    });

    socket.on('message_broadcast', (data) => {
      let messageBag = JSON.parse(data);
      let formattedMessage = `${messageBag.sender} at ${messageBag.timestamp}:\n${messageBag.message}\n\n`;
      setChatroom(chatroom => chatroom + formattedMessage);
    });

    socket.on('error', (error) => {
      ToastAndroid.show('Failed to connect to server', ToastAndroid.LONG);
    });
  }, []);

  if(loading) {
      return (
        <View style={[ExternalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#ff5a5f" />
        </View>
      )
    }

  return (
    <ScrollView style={[ExternalStyles.container, {backgroundColor: theme.background}]}>
      <ThemedText style={{fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10,}}>Chat with us</ThemedText>
      <ScrollView 
        style={[ExternalStyles.output, {padding: 15}]} 
        ref={ref => (this.scrollView = ref)}
        onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}
      >
        <Text style={{ color: theme.text }}>
          {chatroom}
        </Text>
      </ScrollView>
      <TextInput
        style={{fontSize: 16, color: theme.text, margin: 10, borderWidth: 2, borderColor: theme.text, borderRadius: 15 }}
        placeholder="Enter message"
        value={message}
        selectTextOnFocus
        onChangeText={(text) => setMessage(text)}
      />

    <View style={{alignItems: 'center'}}>
        <TouchableOpacity 
            style={[ExternalStyles.button, {width: "60%"}]} 
            onPress= {() => {
                socket.emit('message_sent', {
                sender: name,
                message: message,
                });
                setMessage('');
            }}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Send</Text>                     
        </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default CustomerSupport;

