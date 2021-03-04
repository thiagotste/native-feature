import React, { useCallback, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import CustomeHeaderButton from "../components/headerButton";
import {
    HeaderButtons,
    Item
} from 'react-navigation-header-buttons';
import { useSelector } from "react-redux";
import PlaceItem from "../components/PlaceItem";


const PlaceListScreen = props => {
    const places = useSelector(state => {
        return state.places.places;
    });
    const submitHandler = useCallback(() => {
        return null;
    }, []);

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomeHeaderButton}>
                    <Item
                        title="search"
                        iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                        onPress={() => {
                            props.navigation.navigate('NewPlace');
                        }}
                    />
                </HeaderButtons>
            )
        });
    }, [props.navigation, submitHandler]);

    if (places.length === 0) {
        return (
            <View style={styles.warning}>
                <Text style={styles.text}>Não há lugares cadastrados.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={places}
            keyExtractor={item => item.id}
            renderItem={itemData => <PlaceItem title={itemData.item.title}
                onSelect={
                    () => {
                        props.navigation.navigate('PlaceDetail', {
                            title: itemData.item.title, id: itemData.item.id
                        });
                    }
                } image={itemData.item.img} />}
        />
    );
}

const styles = StyleSheet.create({
    warning: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    }
});
export default PlaceListScreen;