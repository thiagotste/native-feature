import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { HeaderButton } from 'react-navigation-header-buttons';

const CustomeHeaderButton = props => {
    return (
        <HeaderButton IconComponent={Ionicons}
            iconSize={23}
            color={Platform.OS === 'android' ? 'white' : Colors.primary}
            {...props} />
    );
};

export default CustomeHeaderButton;