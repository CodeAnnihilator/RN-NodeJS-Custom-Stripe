import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {View} from 'react-native';

import stylesFactory from './StripeConnectButtonStyles';

const StripeConnectButton = ({
    type='connect',
    isDisabled=false,
    isLoading=false,
    onPress
}) => {
    const isConnect = type === 'connect';
    const isInteractive = !isLoading && !isDisabled;
    const styles = stylesFactory(isConnect);
    return (
        <View opacity={isInteractive ? 1 : 0.6}>
            <TouchableOpacity
                onPress={isInteractive ? () => onPress() : undefined}
                style={styles.wrapper}
            >
                { isLoading && <ActivityIndicator size='small' /> }
                <Text style={styles.text}>{isConnect ? 'Connect with' : 'Disconnect from'}</Text>
                <Icon
                    style={styles.logo}
                    name='stripe'
                    size={30}
                />
            </TouchableOpacity>
        </View>
    )
}

export default StripeConnectButton;