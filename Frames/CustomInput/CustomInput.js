import React from 'react';
import {View, TextInput, Text} from 'react-native';

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

export default CustomInput;

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