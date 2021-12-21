import axios from 'axios';
import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {View, TextInput, Text} from 'react-native';

import StripeConnectButton from './StripeConnectButton';

const StripeGateway = () => {

  const [routingNumber, setRoutingNumber] = useState('110000000');
  const [accountNumber, setAccountNumber] = useState('000123456789');
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectURL, setConnectURL] = useState('');

  const connectAccount = async () => {
    setIsConnecting(true);
    const externalAccountShape = {
      object: 'bank_account',
      country: 'US',
      currency: 'usd',
      routing_number: routingNumber,
      account_number: accountNumber
    };
    await axios.post('http://localhost:4242/create-account-hosted', externalAccountShape)
      .then(({data}) => setConnectURL(data.url))
      .catch(error => console.log(error));
    setIsConnecting(false);
  }

  const handleNavigationChange = ({url}) => {
    const isValidFallback = url.includes('https://example.com');
    if (isValidFallback) return setConnectURL('');
  }

  if (connectURL) return (
    <WebView
      onNavigationStateChange={handleNavigationChange}
      source={{uri: connectURL}}
    />
  )

  return (
    <View>
      <View style={{margin: 30, marginVertical: 100}}>
        <TextBlock label='Currency' value='USD' />
        <TextBlock label='Country' value='United States' />
        <CustomInput label='Routing Number' value={routingNumber} onChangeText={setRoutingNumber} />
        <CustomInput label='Account Number' value={accountNumber} onChangeText={setAccountNumber} />
      </View>
      <StripeConnectButton
        isDisabled={!routingNumber || !accountNumber}
        isLoading={isConnecting}
        onPress={connectAccount}
      />
    </View>
  );
}

const TextBlock = ({
  label,
  value
}) => (
  <View style={TextBlockStyles.wrapper}>
    <Text>{label}</Text>
    <Text style={TextBlockStyles.text}>{value}</Text>
  </View>
)

const CustomInput = ({
  label,
  value,
  onChangeText
}) => (
  <View style={customInputStyles.wrapper}>
    <Text>{label}</Text>
    <TextInput style={customInputStyles.text} onChangeText={onChangeText}>{value}</TextInput>
  </View>
)

const TextBlockStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10
  },
  text: {
    fontWeight: 'bold'
  }
}

const customInputStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10
  },
  text: {
    fontWeight: 'bold',
    padding: 10,
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 4,
    marginVertical: 10
  }
}

export default StripeGateway;