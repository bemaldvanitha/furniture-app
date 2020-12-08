import React,{useState,useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,Platform,TextInput,Switch,Dimensions,ScrollView,Alert,ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux';
import * as firebase from 'firebase';
import * as FileSystem from 'expo-file-system';

import Colors from "../constans/Colors";
import {changeUser,addUser} from '../store/actions/userActions';
import ImageSelector from "../components/ImagePicker";

const EditUserDetailScreen = (props) => {
    const id = props.navigation.getParam('uId');
    const curUser = useSelector(store => store.user.users).find(user => user.id === id);
    const dispatch = useDispatch();
    const firebaseStorage = firebase.storage();

    const [name,setName] = useState(curUser ? curUser.name :'');
    const [email,setEmail] = useState(curUser ? curUser.email :'');
    const [number,setNumber] = useState(curUser ? curUser.telNum :'');
    const [address,setAddress] = useState(curUser ? curUser.address : '');
    const [imageUrl,setImageUrl] = useState(curUser ? curUser.imageUrl : '');
    const [isDealer,setIsDealer] = useState(curUser ? curUser.isDealer : false);
    const [image,setImage] = useState();
    const [isLoading,setIsLoading] = useState(false);

    const [isNameValid,setIsNameValid] = useState(curUser ? true : false);
    const [isEmailValid,setIsEmailValid] = useState(curUser ? true : false);
    const [isNumberValid,setIsNumberValid] = useState(curUser ? true : false);
    const [isAddressValid,setIsAddressValid] = useState(curUser ? true : false);
    //const [isImageUrlValid,setIsImageUrlValid] = useState(curUser ? true : false);

    let url = '';

    const handleSubmit = useCallback( () => {
        if(!isNameValid || !isEmailValid || !isNumberValid || !isAddressValid){
            Alert.alert('wrong input','input not valid',[
                {title: 'ok'}
            ]);
            return;
        }
        if(curUser){
            Alert.alert('are you sure','are you sure about editing the user',[
                {title: 'cancel'},
                {title: 'yes',onPress: () => {
                        dispatch(changeUser(id,name,email,number,address,curUser.imageUrl,isDealer,curUser.storedLoc));
                        props.navigation.goBack();
                    }}
            ]);
        }else{
            if(!image){
                Alert.alert('set your image','you must need to upload image',[
                    {title: 'ok'}
                ]);
            }
            else{
                Alert.alert('are you sure','are you sure about information',[
                    {title: 'cancel'},
                    {title: 'yes',onPress: async () => {
                            setIsLoading(true);

                            await handleUpload();
                            setTimeout( () => {
                                dispatch(addUser(name,email,number,address,url,isDealer));
                                setIsLoading(false);
                                props.navigation.navigate({routeName: 'Shops'});
                            },8000);
                        }}
                ]);
            }
        }
    },[dispatch,name,email,number,address,imageUrl,isDealer]);

    const handleUpload = async () => {
        try{
            const imageUri = image.uri;
            const imageName = image.uri.split('/').pop();
            const response = await fetch(imageUri);
            const uploadImage = await response.blob();

            const ref = firebaseStorage.ref().child('users').child(imageName);
            await ref.put(uploadImage);
            const downloadUrl = await ref.getDownloadURL();

            setImageUrl(downloadUrl);
            url = downloadUrl;
            console.log(url);
        }catch (err) {
            console.log(err);
            throw err;
        }
    };

    useEffect(() => {
        props.navigation.setParams({'save': handleSubmit});
    },[handleSubmit]);

    const handleName = (value) => {
        if(value.trim().length > 5){
            setIsNameValid(true);
        }else{
            setIsNameValid(false);
        }
        setName(value);
    };

    const handleEmail = (value) => {
      if(value.trim().length > 6){
          const re = /\S+@\S+\.\S+/;
          if(re.test(email.toString())){
              setIsEmailValid(true);
          }else{
              setIsEmailValid(false);
          }
      }else{
          setIsEmailValid(false);
      }
      setEmail(value);
    };

    const handleNumber = (value) => {
      if(value.trim().length === 12){
          setIsNumberValid(true);
      }else{
          setIsNumberValid(false);
      }
      setNumber(value.toString());
    };

    const handleAddress = (value) => {
        if(value.trim().length >= 10){
            setIsAddressValid(true);
        }else{
            setIsAddressValid(false);
        }
      setAddress(value);
    };

    /*const handleImageUrl = (value) => {
        if(value.trim().length > 10){
            setIsImageUrlValid(true);
        }else{
            setIsImageUrlValid(false);
        }
        setImageUrl(value);
    };*/

    const handleImage = (image) => {
        setImage(image);
    };

    return(
        <ScrollView>
            <View style={styles.screen}>
                {
                    isLoading && <ActivityIndicator size='large' color={Colors.primary}/>
                }
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Name</Text>
                    <TextInput placeholder='enter your name' multiline={true} keyboardType='default' style={styles.input} value={name} onChangeText={handleName}/>
                    {!isNameValid && <Text style={styles.errorText}>enter valid name</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Email</Text>
                    <TextInput placeholder='enter your email' multiline={true} keyboardType='email-address' style={styles.input} value={email} onChangeText={handleEmail}/>
                    {!isEmailValid && <Text style={styles.errorText}>enter valid email</Text> }
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Number</Text>
                    <TextInput placeholder='enter your number' multiline={true} keyboardType='number-pad' style={styles.input} value={number} onChangeText={handleNumber}/>
                    {!isNumberValid && <Text style={styles.errorText}>enter valid number</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Address</Text>
                    <TextInput placeholder='enter your address' multiline={true} keyboardType='default' style={styles.input} value={address} onChangeText={handleAddress}/>
                    {!isAddressValid && <Text style={styles.errorText}>enter valid address</Text>}
                </View>
                {/*<View style={styles.inputContainer}>
                    <Text style={styles.label}>Enter Image Url</Text>
                    <TextInput placeholder='enter your image url' multiline={true} keyboardType='default' style={styles.input} value={imageUrl} onChangeText={handleImageUrl}/>
                    {!isImageUrlValid && <Text style={styles.errorText}>enter valid image url</Text>}
                </View>*/}
                {
                    !curUser && <ImageSelector takeImage={handleImage}/>
                }
                <View>
                    <Text style={styles.label}>Is Dealer</Text>
                    <Switch thumbColor='#ffb07c' trackColor={Colors.background} style={styles.switch} value={isDealer} onValueChange={(value) => setIsDealer(!isDealer)}/>
                </View>
            </View>
        </ScrollView>
    )
};

EditUserDetailScreen.navigationOptions = navData => {
    const save = navData.navigation.getParam('save');
  return{
      headerTitle: 'Edit User Details',
      headerTitleAlign: 'center',
      headerRight: () => {
          return(
              <View style={{paddingTop: 15,paddingRight: 20}}>
                  <Ionicons name={Platform.OS === 'android' ? 'md-save' : 'ios-save'} size={23} color={Platform.OS === 'android' ? 'white' : Colors.primary}
                            onPress={save}/>
              </View>
          )
      }
  }
};

const styles = StyleSheet.create({
    screen: {
        marginHorizontal: 20,
        marginVertical: 40
    },
    inputContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    label: {
        fontFamily: 'chilanka',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '800'
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: Dimensions.get('screen').width * 0.8,
    },
    errorText: {
        textAlign: 'center',
        color: 'red'
    },
    switch: {
        marginHorizontal: 150
    }
});

export default EditUserDetailScreen;