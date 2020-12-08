import React,{useEffect} from 'react';
import {View, Text, StyleSheet, Platform,FlatList} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {useSelector,useDispatch} from 'react-redux';

import Colors from "../constans/Colors";
import OrderItem from "../components/OrderItem";
import {fetchOrders} from '../store/actions/ordersActions';

const OrdersScreen = (props) => {
    const orders = useSelector(store => store.order.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    },[dispatch]);

    return(
        <View style={styles.screen}>
            <FlatList data={orders} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                return(
                    <OrderItem id={data.item.id} items={data.item.items} date={data.item.date} totalAmount={data.item.totalAmount} shipAddress={data.item.shipAddress}
                               deliveryDate={data.item.deliveryDate} />
                )
            }}/>
        </View>
    )
};

OrdersScreen.navigationOptions = navData => {
    return{
        headerLeft: () => {
            return(
                <View style={{paddingLeft: 20,paddingTop: 15}}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-menu': 'ios-menu'} size={23} color={Platform.OS === 'android' ? 'white' : Colors.primary} onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}/>
                </View>
            )
        },
    }
};

const styles = StyleSheet.create({
    screen: {
        marginHorizontal: 20,
        marginVertical: 40
    }
});

export default OrdersScreen;