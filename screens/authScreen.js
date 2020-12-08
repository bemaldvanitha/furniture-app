import React,{useState,useEffect} from 'react';
import {View,StyleSheet,Text,TextInput,Button,Alert,ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';

import Colors from "../constans/Colors";
import {signUp,signIn} from '../store/actions/authActions';

const AuthScreen = (props) => {
    const dispatch = useDispatch();

    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState();
    
    const [isSignUp,setIsSignUp] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [password2,setPassword2] = useState('');

    const [isEmailValid,setIsEmailValid] = useState(false);
    const [isPasswordValid,setIsPasswordValid] = useState(false);
    const [isPassword2Valid,setIsPassword2Valid] = useState(false);

    useEffect(() => {
        if(error){
            Alert.alert('authentication error',error,[
                {text: 'Ok'}
            ])
        }
    },[error]);

    const handleAuthentication = async () => {
        setIsLoading(true);
        setError(null);
        if(isSignUp){
            try {
                await dispatch(signUp(email, password));
                setIsLoading(false);
                props.navigation.navigate({routeName: 'AdditionalDetail'});
            }catch (err) {
                setError(err.message);
                setIsLoading(false);
            }

        }else{
            try {
                await dispatch(signIn(email, password));
                setIsLoading(false);
                props.navigation.navigate({routeName: 'Shops'})
            }catch (err) {
                setError(err.message);
                setIsLoading(false);
            }

        }
        setError(null);
        setIsLoading(false);
    };

    const handleEmail = (value) => {
        if(value.trim().length > 6){
            const re = /\S+@\S+\.\S+/;
            if(re.test(email.toString())){
                setIsEmailValid(true);
            }else{
                setIsEmailValid(false);
            }
            //setIsEmailValid(true);
        }else{
            setIsEmailValid(false);
        }
        setEmail(value);
    };

    const handlePassword = (value) => {
      if(value.trim().length > 5){
          setIsPasswordValid(true);
      }else{
          setIsPasswordValid(false);
      }
      setPassword(value)
    };

    const handlePassword2 = (value) => {
        if(value.trim().length > 5){
            if(password === value.trim()){
                setIsPassword2Valid(true);
            }else{
                setIsPassword2Valid(false);
            }
        }else{
            setIsPassword2Valid(false);
        }
        setPassword2(value);
    };

    return(
        <View style={styles.screen}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>enter email</Text>
                <TextInput placeholder='enter your email' multiline={true} keyboardType='default' style={styles.input} value={email} onChangeText={handleEmail}/>
                {!isEmailValid && <Text style={styles.errorText}>enter valid email</Text>}
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>enter password</Text>
                <TextInput placeholder='enter your password' keyboardType='default' style={styles.input} secureTextEntry={true} value={password} onChangeText={handlePassword} />
                {!isPasswordValid && <Text style={styles.errorText}>enter valid password</Text>}
            </View>
            {isSignUp && <View style={styles.inputContainer}>
                <Text style={styles.label}>enter password again</Text>
                <TextInput placeholder='enter your password again' keyboardType='default' style={styles.input} secureTextEntry={true} value={password2} onChangeText={handlePassword2}/>
                {!isPassword2Valid && <Text style={styles.errorText}>password didn't match</Text>}
            </View>}
            {
                !isLoading ? <View style={styles.buttonContainer}>
                    <Button title={isSignUp ? 'Sign Up': 'Sign In'} color='#fe9c8f' onPress={handleAuthentication}/>
                    <Button title={isSignUp ? 'Switch to SignIn' : 'Switch to SignUp'} color='#dfa290' onPress={() => {
                        setIsSignUp(!isSignUp)
                    }}/>
                </View> : <ActivityIndicator size='large' color={Colors.primary}/>
            }
        </View>
    )
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authentication',
  headerTitleAlign: 'center'
};

const styles = StyleSheet.create({
    screen: {
        marginVertical: 60,
        marginHorizontal: 20,
        paddingVertical: 50,
        paddingHorizontal: 30,
        backgroundColor: Colors.background
    },
    inputContainer: {
        marginVertical: 20
    },
    input: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        height: 50,
        fontSize: 14
    },
    label: {
        fontFamily: 'roboto-italic',
        fontSize: 16
    },
    buttonContainer: {
        paddingTop: 10,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    errorText: {
        color: 'red'
    }
});

export default AuthScreen;