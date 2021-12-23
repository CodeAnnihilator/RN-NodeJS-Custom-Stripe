import React from 'react';
import {View, Button, Alert} from 'react-native';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';
import axios from 'axios';

const baseURL = 'http://localhost:4242';

export default function PaymentScreen() {

  const {confirmPayment, loading} = useConfirmPayment();

  const handlePayPress = async () => {
    const {data: {client_secret}} = await axios.post(`${baseURL}/create-payment-intent`, {
      paymentMethod: 'card',
      currency: 'usd'
    });

    const {error, paymentIntent} = await confirmPayment(client_secret, {type: 'Card'}); // put customer details here

    if (error) Alert.alert(`Error alert: ${error.code}`, error.message);
    if (paymentIntent) Alert.alert(`Payment successfull: ${paymentIntent.id}`);
  }

  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholder={{number: '4242 4242 4242 4242'}}
        cardStyle={styles.cardStyle}
        style={styles.style}
        onCardChange={(cardDetails) => console.log('cardDetails', cardDetails)}
        onFocus={(focusedField) => console.log('focusField', focusedField)}
      />
      <Button
        title='Pay'
        onPress={handlePayPress}
        disable={loading}
      />
    </View>
  );
}

const styles = {
  cardStyle: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
  },
  style: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  }
}