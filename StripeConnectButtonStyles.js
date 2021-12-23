import cn from 'react-native-classnames';

const styles = {
    wrapper: {
        color: '#635bff',
        minHeight: 40,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'silver',
        borderWidth: 1,
        margin: 80,
    },
    disconnectWrapper: {
        borderColor: '#FF635B'
    },
    text: {
        marginLeft: 10,
    },
    disconnectText: {
        color: '#FF635B',
    },
    disconnectLogo: {
        color: '#FF635B',
    },
    logo: {
        marginLeft: 5
    },
    isDisabled: {
        opacity: 0.6
    }
}

export default stylesFactory = (conditionMet) => {
    const text = cn(styles, {disconnectText: !conditionMet});
    const logo = cn(styles, 'logo', {disconnectLogo: !conditionMet});
    const wrapper = cn(styles, 'wrapper', {disconnectWrapper: !conditionMet});
    return {
        text,
        logo,
        wrapper
    }
}