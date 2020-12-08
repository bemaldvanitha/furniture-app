import React,{useEffect} from 'react';
import {View, Text, StyleSheet, Platform,Image,Dimensions,ScrollView,Button} from 'react-native';
import {Ionicons,FontAwesome} from "@expo/vector-icons";
import {useSelector,useDispatch} from 'react-redux';

import Colors from "../constans/Colors";
//import {fetchCurrentUser} from '../store/actions/userActions';

const  UserProfileScreen = (props) => {
    /*const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUser());
    },[dispatch]);*/

    const userId = useSelector(state => state.auth.userId);
    const curUser = useSelector(state => state.user.users).find(user => user.id === userId);

    /*const alUser = useSelector(state => state.user.users).find(user => user.id === userId);
    console.log(alUser);
    console.log(userId);*/

    return(
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.profilePicContainer}>
                    <View style={styles.avatar}>
                        <Image source={{uri: curUser.imageUrl}} style={styles.profilePic}/>
                    </View>
                    <FontAwesome style={{marginTop: 180}} name="pencil" size={32} color="black" />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title='Change Detail' color='coral' onPress={() => {
                        props.navigation.navigate({routeName: 'editUser',params: {uId: userId}})
                    }}/>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.box}>
                        <Text style={styles.label}>Name := </Text>
                        <Text style={styles.name}>{curUser.name}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.label}>Email := </Text>
                        <Text numberOfLines={3} style={styles.otherText}>{curUser.email}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.label}>Address := </Text>
                        <Text style={styles.otherText}>{curUser.address}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.label}>Telephone := </Text>
                        <Text style={styles.otherText}>{curUser.telNum}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

UserProfileScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Furniture App',
        headerLeft: () => {
            return(
                <View style={{paddingLeft: 20,paddingTop: 15}}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-menu': 'ios-menu'} size={23} color={Platform.OS === 'android' ? 'white' : Colors.primary} onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}/>
                </View>
            )
        },
        headerTitleAlign: 'center'
    }
};

const styles = StyleSheet.create({
    screen: {

    },
    profilePicContainer: {
        height: Dimensions.get('screen').height * 0.4,
        backgroundColor: '#e5bca5',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    profilePic: {
        width: 200,
        height: 200,
    },
    avatar: {
        borderColor: 'black',
        borderWidth: 1,
        width: Dimensions.get('screen').width * 0.4,
        height: Dimensions.get('screen').height * 0.2,
        borderRadius: 80,
        overflow: 'hidden'
    },
    detailContainer: {
        marginTop: 20
    },
    name: {
        fontFamily: 'chilanka',
        fontSize: 16
    },
    otherText: {
        fontFamily: 'chilanka',
        fontSize: 12
    },
    label: {
        fontFamily: 'roboto-bold',
        fontSize: 16,
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 20,
        marginHorizontal: 20,
        borderColor: 'black',
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        overflow: 'hidden',
        backgroundColor: '#ffcc99'
    },
    buttonContainer: {
        marginVertical: 10,
        marginHorizontal: 80,
    }
});

export default UserProfileScreen;