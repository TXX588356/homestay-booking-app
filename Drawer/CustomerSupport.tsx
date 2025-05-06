import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { ExternalStyles } from '../Styles'
import MySwitch from '../components/MySwitch'
import { ThemeContext } from '../util/ThemeManager'
import io from 'socket.io-client';
import config from '../config';

var socket = io(`${config.settings.serverPath}/chat`, {
    transports: ['websocket'],
});

const CustomerSupport = () => {
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Chat with us</Text>
      <TextInput
        style={styles.output}
        value={chatroom}
        multiline
        editable={false}
      />
      <TextInput
        style={[styles.input, {borderWidth: 1, borderColor: 'black' }]}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    fontSize: 16,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
  output: {
    height: 400,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    color: 'black',
  },
  button: {
    padding: 20,
    backgroundColor: 'blue',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  }
});