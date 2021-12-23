import React from 'react';
import {View, Text} from 'react-native';
import Config from "react-native-config";
import { StripeProvider } from '@stripe/stripe-react-native';

import StripeGateway from './StripeGateway';
import StripePaymentScreen from './StripePaymentScreen';

const App = () => {

  return (
    <View>
      <Text style={{marginTop: 100}}>This is how Craver would pay</Text>
      <StripeProvider
        publishableKey={Config.STRIPE_PUBLIC_KEY}
        merchantIdentifier='merchant.identifier'
      >
        <StripePaymentScreen />
      </StripeProvider>
      <Text style={{marginTop: 100}}>This is how Cheff is connecting through stripe</Text>
      <StripeGateway />
    </View>
  );
}

export default App;
