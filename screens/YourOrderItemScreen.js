import React,{useEffect} from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

import OrderedItem from "../components/OrderedItem";
import {fetchOrdered} from '../store/actions/furnitureActions';

const YourProductScreen = (props) => {
    const userId = useSelector(store => store.auth.userId);

    const shopOrders = useSelector(store => store.furniture.orderedProducts).filter(pro => pro.uId === userId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrdered(userId));
    },[dispatch]);

    return(
        <View style={styles.screen}>
            <FlatList data={shopOrders} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                return(
                    <OrderedItem id={data.item.id} color={data.item.color} proName={data.item.itemName} orderedDate={data.item.orderedDate}
                                 customerName={data.item.orderedName} quantity={data.item.quantity} shipAddress={data.item.shipAddress} shippedDate={data.item.shippedDate}/>
                )
            }}/>
        </View>
    )
};

YourProductScreen.navigationOptions = {
  headerTitle: 'Shop Orders',
  headerTitleAlign: 'center'
};

const styles = StyleSheet.create({
    screen: {
        marginHorizontal: 10,
        marginVertical: 25
    }
});

export default YourProductScreen;