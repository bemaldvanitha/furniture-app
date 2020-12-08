import React from 'react';
import {View, Text, StyleSheet, FlatList, Platform} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {Ionicons,Entypo} from '@expo/vector-icons';

import Colors from "../constans/Colors";
import ProductItem from "../components/ProductItem";
import {deleteProduct} from '../store/actions/furnitureActions';

const UserProductScreen = (props) => {
    const userId = useSelector(store => store.auth.userId).toString();
    const dispatch = useDispatch();
    const userProducts = useSelector(store => store.furniture.products).filter(pro => pro.uId === userId);
    const isUserDealer = useSelector(store => store.user.users).find(user => user.id === userId).isDealer;

    if(!isUserDealer){
        return (
            <View style={styles.altScreen}>
                <Text style={styles.altText}>You Are Not Dealer</Text>
            </View>
        )
    }

    if(!userProducts){
        return (
            <View style={styles.altScreen}>
                <Text style={styles.altText}>No Products Available</Text>
            </View>
        )
    }
    return(
        <View style={styles.screen}>
            <FlatList data={userProducts} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                return(
                    <ProductItem id={data.item.id} image={data.item.imageUrl} isEdit={true} title={data.item.title} detail={data.item.description} price={data.item.price} onSelect={() => {
                        props.navigation.navigate({routeName: 'detail',params: {id: data.item.id}});
                    }} editPress={() => {
                        props.navigation.navigate({routeName: 'productEdit',params: {id: data.item.id}});
                    }} deletePress={() => {
                        dispatch(deleteProduct(data.item.id));
                    }}/>
                )
            }}/>
        </View>
    )
};

UserProductScreen.navigationOptions = navData => {
    return{
        headerTitle: 'User Items',
        headerTitleAlign: 'center',
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
                <View style={{paddingTop: 15,paddingRight: 20,flexDirection: 'row'}}>
                    <Ionicons style={{paddingRight: 15}} name={Platform.OS === 'android' ? 'md-add' : 'ios-add'} size={23} color={Platform.OS === 'android' ? 'white': Colors.primary} onPress={() => {
                        navData.navigation.navigate({routeName: 'productEdit'})
                    }}/>
                    <Entypo style={{paddingLeft: 15}} name="shopping-bag" size={23} color={Platform.OS === 'android' ? 'white' : Colors.primary} onPress={() => {
                        navData.navigation.navigate({routeName: 'seller'})
                    }}/>
                </View>
            )
        }
    }
};

const styles = StyleSheet.create({
    screen: {
        marginHorizontal: 10,
        marginVertical: 20
    },
    altScreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    altText: {
        fontSize: 15,
        fontFamily: 'roboto'
    }
});

export default UserProductScreen;