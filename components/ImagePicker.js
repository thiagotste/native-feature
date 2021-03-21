import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from "expo-permissions";
import Colors from '../constants/Colors';

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();
    const verifyPermisions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY);
        if (result.status !== 'granted') {
            Alert.alert('Insuficiente permissão',
                'Você precisa dar permissão para usar a camera.',
                [{ text: 'Okay' }]);
            return false;
        }
        return true;
    };
    const takeImageHandler = async () => {
        const hasPermission = await verifyPermisions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri)
    }

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
               { !pickedImage ? (<Text>Sem imagem ainda.</Text>) :
                (<Image style={styles.image} source={{uri: pickedImage}} />)}
            </View>
            <Button
                title="Obter imagem"
                color={Colors.primary}
                onPress={takeImageHandler}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImgPicker;