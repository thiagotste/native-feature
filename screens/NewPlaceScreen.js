import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from 'react-native';
import Colors from '../constants/Colors';
import { useDispatch } from "react-redux";
import { addPlace } from "../store/action/PlacesAction";
import ImgPicker from "../components/ImagePicker";

const NewPlaceScreen = props => {
    const [titleValue, setTitleValue] = useState('');
    const [selectedImg, setSelectedImg] = useState();
    const dispatch = useDispatch();

    const titleChangeHAndler = text => {
        setTitleValue(text)
    }

    const saveHandler = () => {
        dispatch(addPlace(titleValue, selectedImg));
        props.navigation.navigate('PlaceList');
    }

    const imageTakenHandler = (img) => {
        setSelectedImg(img);
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Título</Text>
                <TextInput
                    style={styles.textinput}
                    onChangeText={titleChangeHAndler}
                    value={titleValue}
                />
                <ImgPicker onImageTaken={imageTakenHandler} />
                <Button
                    title="Salvar lugar"
                    color={Colors.primary}
                    onPress={saveHandler}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textinput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingVertical: 2
    }
});
export default NewPlaceScreen;