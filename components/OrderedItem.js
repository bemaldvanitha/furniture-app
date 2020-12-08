import React from 'react';
import {View,Text,StyleSheet,Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useDispatch,useSelector} from 'react-redux';

import {shipOrder} from '../store/actions/furnitureActions';

const OrderedItem = (props) => {
    const userId = useSelector(store => store.auth.userId);
    const dispatch = useDispatch();
   return(
       <View style={styles.box}>
            <View style={styles.boxHeader}>
                <Text style={styles.quantity}>{props.quantity} x </Text>
                <Text style={styles.name}>{props.proName}</Text>
                <Ionicons name="md-color-fill" size={50} color={props.color} />
            </View>
           <View style={styles.boxBody}>
               <Text style={styles.subName}>shipped name  {props.customerName}</Text>
               <Text style={styles.subName}>shipped address {props.shipAddress}</Text>
               <Text style={styles.dates}>Ordered Date : {props.orderedDate.toString().substring(0,10)}</Text>
               {
                   props.shippedDate && <Text style={styles.dates}>Shipped Date : {props.shippedDate.toString().substring(0,10)}</Text>
               }
           </View>
           {
               !props.shippedDate && <View style={styles.buttonContainer}>
                        <Button title='Ship' color='purple' onPress={() => {
                            dispatch(shipOrder(props.id,userId));
                        }}/>
                    </View>
           }
       </View>
   )
};

const styles = StyleSheet.create({
    box: {
        marginVertical: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#d0fefe',
        borderRadius: 20,
        shadowOpacity: 0.26,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 0
        },
        elevation: 6
    },
    boxHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    boxBody: {
        paddingLeft: 20
    },
    name: {
        fontFamily: 'roboto-black',
        fontSize: 18
    },
    quantity: {
        fontFamily: 'roboto-black',
        fontSize: 20
    },
    dates: {
        fontFamily: 'sansita-swashed',
        textAlign: 'center'
    },
    subName: {
        fontFamily: 'chilanka',
        fontSize: 14
    },
    buttonContainer: {
        paddingTop: 15,
        paddingBottom: 10
    }
});

export default OrderedItem;