import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { CardField } from '@stripe/stripe-react-native';
import { Formik } from 'formik';

const StripeGateway = () => {

  return (
    <View>
      <Formik
        initialValues={{
          cardNumber: '4242 4242 4242 4242',

        }}
        onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <TextInput
              onChangeText={handleChange('cardNumber')}
              onBlur={handleBlur('cardNumber')}
              value={values.cardNumber}
            />
            <CardField
              postalCodeEnabled={true}
              placeholder={values.cardNumber}
              cardStyle={cardStyles.cardStyle}
              style={cardStyles.style}
              onCardChange={(asd) => console.log(asd)}
              dangerouslyGetFullCardDetails
            />
            <Button onPress={handleSubmit} title='Submit' />
          </View>
        )}
      </Formik>
      <Button onPress={handleSubmit} title='Submit' />
    </View>
  );
}

const cardStyles = {
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

export default StripeGateway;

<CardField
postalCodeEnabled={false}
style={{height: 50, marginVertical: 100}}
onCardChange={(card) => setCard(card)}
dangerouslyGetFullCardDetails
/>