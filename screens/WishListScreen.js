import React from 'react';
import {View, Text, StyleSheet, Platform,FlatList} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useSelector} from 'react-redux';

import Colors from "../constans/Colors";
import ProductItem from "../components/ProductItem";

const WishListScreen = (props) => {
    const wishListPro = useSelector(store => store.furniture.wishListProducts);
    if(wishListPro.length === 0){
        return (
            <View style={styles.failScreen}>
                <Text numberOfLines={2} style={styles.failText}>No wishList Available try to Add</Text>
            </View>
        )
    }
    return(
        <View style={styles.screen}>
            <FlatList data={wishListPro} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                return(
                    <ProductItem image={data.item.imageUrl} title={data.item.title} detail={data.item.description} price={data.item.price} onSelect={() => {
                        props.navigation.navigate({routeName: 'detail',params: {id: data.item.id}})
                    }}/>
                )
            }}/>
        </View>
    )
};

WishListScreen.navigationOptions = navData => {
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
        headerRight: () => {
            return(
                <View style={{paddingRight: 20,paddingTop: 15}}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-cart': 'ios-cart'} size={23} color={Platform.OS === 'android' ? 'white': Colors.primary} onPress={() => {
                        navData.navigation.navigate({routeName: 'cartNav'});
                    }}/>
                </View>
            )
        },
        headerTitleAlign: 'center'
    }
};

const styles = StyleSheet.create({
    screen: {
        marginVertical: 5,
        marginHorizontal: 10
    },
    failScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    failText: {
        fontFamily: 'roboto-italic',
        fontSize: 20
    }
});

export default WishListScreen;