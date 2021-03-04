import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Colors from '../constants/Colors';

const placeItem = props => {
    return (
        <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
            <Image style={styles.image} 
            source={{
                uri: props.image,
              }} />
            <View style={styles.infoContainer} >
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.address}>{props.address}</Text>
            </View >
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    placeItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    image: {
        width: 70,
        height: 70,
        marginHorizontal: 30,
        marginVertical: 20,
        borderRadius: 50,
        borderColor: Colors.primary,
        borderWidth: 3,
        backgroundColor: '#ccc'
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'space-around'
    },
    title: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    address: {
        color: '#666',
        fontSize: 16
    }
});

export default placeItem;