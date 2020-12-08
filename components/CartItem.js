import React from 'react';
import {View,Text,StyleSheet,ToastAndroid} from 'react-native';
import {MaterialCommunityIcons,Ionicons} from '@expo/vector-icons';
import {useDispatch} from 'react-redux';

import Colors from "../constans/Colors";
import {removeFromCart} from '../store/actions/cartActions';

const CartItem = (props) => {
    const dispatch = useDispatch();
    const removeItem = () => {
        ToastAndroid.show('Remove From Cart',ToastAndroid.LONG);
    };

    return(
        <View style={styles.box}>
            <Text style={styles.quantity}>{props.quantity} x </Text>
            <Text style={styles.title}>{props.title}</Text>
            <MaterialCommunityIcons name='checkbox-blank-circle' size={32} color={props.color}/>
            <Text style={styles.price}> $ {props.price}</Text>
            <Ionicons name="ios-close" size={40} color="red" onPress={() => {
                removeItem();
                dispatch(removeFromCart(props.id));
            }}/>
        </View>
    )
};

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        paddingHorizontal: 10,
        paddingVertical: 20,
        backgroundColor: Colors.background,
        marginVertical: 10
    },
    title: {
        fontFamily: 'roboto',
        fontSize: 16
    },
    quantity: {
        fontFamily: 'roboto',
        fontSize: 14
    },
    price: {
        fontFamily: 'roboto',
        fontSize: 14,
        alignItems: 'center'
    }
});

export default CartItem;
