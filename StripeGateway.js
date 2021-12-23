import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {View, Text} from 'react-native';

const baseURL = 'http://localhost:4242';

import StripeConnectButton from './StripeConnectButton';

const StripeGateway = () => {

  useEffect(() => {
    axios.get(`${baseURL}/retrieve-account`)
      .then(({data}) => setIsAccountExists(data))
      .catch(() => setIsAccountExists(false));
  }, [])

  const [isAccountExists, setIsAccountExists] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [connectURL, setConnectURL] = useState('');

  const deleteAccount = async () => {
    setIsProcessing(true);
    await axios.post(`${baseURL}/delete-account`)
    setIsProcessing(false);
  }

  const connectAccount = async () => {
    setIsProcessing(true);
    await axios.post(`${baseURL}/connect-account`)
      .then(({data}) => setConnectURL(data.url))
      .catch(error => console.log(error));
    setIsProcessing(false);
  }

  const onNavCHange = ({url}) => {
    const isValidFallback = url.includes('https://example.com');
    if (isValidFallback) return setConnectURL('');
  }

  if (isAccountExists === null) return <Text>validating...</Text>

  if (connectURL) return (
    <WebView
      onNavigationStateChange={onNavCHange}
      source={{uri: connectURL}}
    />
  )

  return (
    <View>
      {
        !isAccountExists && (
          <StripeConnectButton
            type='connect'
            isLoading={isProcessing}
            onPress={connectAccount}
          />
        )
      }
      {
        isAccountExists && (
          <StripeConnectButton
            type='disconnect'
            isLoading={isProcessing}
            onPress={deleteAccount}
          />
        )
      }
    </View>
  );
}

export default StripeGateway;