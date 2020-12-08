import React,{useState} from 'react';
import {View,StyleSheet,Text,Button,Dimensions,Image,Alert} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const ImageSelector = (props) => {
    const [pickedImage,setPickedImage] = useState();

    const grantPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);
        if(result.status !== 'granted'){
            Alert.alert('permissions required','you need to grant this permission',[
                {text: 'ok'}
            ]);
            return false;
        }
        return true;
    };

    const TakeImage = async () => {
        const hasPermission = await grantPermissions();
        if(!hasPermission){
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            quality: 0.4,
            allowsEditing: true,
        });
        props.takeImage(image);
        setPickedImage(image.uri);
    };

    return(
        <View style={styles.imagePicker}>
            <View style={styles.box}>
                {!pickedImage && <Text>No Image Taken</Text>}
                <Image source={{uri: pickedImage}} style={styles.image}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title='Take Image' color='coral' onPress={TakeImage}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    box: {
        borderWidth: 1,
        borderColor: 'black',
        height: Dimensions.get('screen').height * 0.15,
        width: Dimensions.get('screen').width * 0.3,
        borderRadius: 15,
        overflow: 'hidden'
    },
    imagePicker: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    buttonContainer: {

    }
});

export default ImageSelector;