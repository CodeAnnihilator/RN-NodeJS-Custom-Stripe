import React from 'react';
import {View, Text} from 'react-native';

const TextBlock = ({
    label,
    value
}) => (
    <View style={TextBlockStyles.wrapper}>
        <Text>{label}</Text>
        <Text style={TextBlockStyles.text}>{value}</Text>
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


export default TextBlock;