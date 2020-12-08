import React,{useState} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';

const OrderItem = (props) => {
    const [showAll,setShowAll] = useState(false);

    return(
        <View style={styles.box}>
            <View style={styles.bar}>
                <Text style={styles.amount}>$ {props.totalAmount}</Text>
                <Text style={styles.date}>{props.deliveryDate.toString().substring(0,10)}</Text>
                <Ionicons name="ios-arrow-down" size={32} color="red" onPress={() => {
                    setShowAll(!showAll);
                }}/>
            </View>
            <View style={styles.items}>
                {showAll && props.items.map(item => {
                    return(
                        <View style={styles.itemDetail} key={item.productId}>
                            <Text style={styles.number}>{item.productQuantity} x </Text>
                            <Text style={styles.title}>{item.productTitle}</Text>
                            <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={item.productColor} />
                            <Text style={styles.number}>{item.productPrice}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.dates}>
                <Text style={styles.address}>Ship Address:  {props.shipAddress}</Text>
                <Text style={styles.date}>Delivered Date:  {props.deliveryDate.toString().substring(0,10)}</Text>
                {}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    box: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 10
    },
    bar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#ffec89',
        paddingVertical: 10
    },
    dates: {
        backgroundColor: '#ffa180',
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    itemDetail: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20
    },
    items: {
        //paddingTop: 20,
        //paddingBottom: 20,
        backgroundColor: '#f3dfd4'
    },
    amount: {
        fontFamily: 'roboto-bold',
        fontSize: 16
    },
    date: {
        fontFamily: 'sansita-swashed',
        fontSize: 15
    },
    title: {
        fontFamily: 'chilanka',
        fontSize: 15
    },
    number: {
        fontFamily: 'sansita-swashed',
        fontSize: 15
    },
    address: {
        fontFamily: 'chilanka',
        fontSize: 14
    }
});

export default OrderItem;