import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {View} from 'react-native';

import styles from './StripeConnectButtonStyles';

const StripeConnectButton = ({
    isDisabled,
    isLoading,
    onPress
}) => {
    const isInteractive = !isLoading && !isDisabled;
    return (
        <View opacity={isInteractive ? 1 : 0.6}>
            <TouchableOpacity
                onPress={isInteractive ? () => onPress() : undefined}
                style={styles.wrapper}
            >
                { isLoading && <ActivityIndicator size='small' /> }
                <Text style={styles.text}>Connect with</Text>
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