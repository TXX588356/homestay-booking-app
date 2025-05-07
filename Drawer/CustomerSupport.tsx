import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { ExternalStyles } from '../Styles'
import { ThemeContext } from '../util/ThemeManager'
import io from 'socket.io-client';
import config from '../config';
import ThemedText from '../components/ThemedText';

var socket = io(`${config.settings.serverPath}/chat`, {
    transports: ['websocket'],
});

const CustomerSupport = () => {
    const { theme } = useContext(ThemeContext);
  
  const [name, setName] = useState('User');  // fixed name for user
  const [message, setMessage] = useState('');
  const [chatroom, setChatroom] = useState('');

  useEffect(() => {
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

  return (
    <ScrollView style={[ExternalStyles.container, {backgroundColor: theme.background}]}>
      <ThemedText style={{fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 10,}}>Chat with us</ThemedText>
      <TextInput
        style={[ExternalStyles.output, {color: theme.text}]}
        value={chatroom}
        multiline
        editable={false}
      />
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

