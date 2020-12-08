import React from 'react';
import {View,Text,StyleSheet,FlatList,Button} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';

import {addOrder} from '../store/actions/ordersActions';
import {removeAllCart} from '../store/actions/cartActions';
import {addOrderedList} from '../store/actions/furnitureActions';
import CartItem from "../components/CartItem";

const CartScreen = (props) => {
    const cartItem = useSelector(store => store.cart.cart);
    const products  = useSelector(store => store.furniture.products);
    const curUser = useSelector(store => store.user.users).find(user => user.id === 'u1');
    const allUsers = useSelector(store => store.user.users);
    const dispatch = useDispatch();

    let totalPrice = 0;

    cartItem.map((item) => {
        totalPrice += item.price;
    });

    const orderProduct = () => {
      const productList = [];
      cartItem.map(item  => {
         const title = products.find(pro => pro.id === item.proId).title;
         const providerId = products.find(pro => pro.id === item.proId).uId;

         let deliveredDate = new Date();
         deliveredDate.setDate(deliveredDate.getDate() + 7);

         productList.push({
            productId: item.proId,
            productTitle: title,
            productPrice: item.price,
            productQuantity: item.quantity,
            productColor: item.color,
             productProviderId: providerId
         });
      });

      cartItem.map(item => {
         const product = products.find(pro => pro.id === item.proId);
         const orderedPerson = allUsers.find(user => user.id === 'u1');
         dispatch(addOrderedList(product.title,item.quantity,item.color,orderedPerson.address,product.uId,orderedPerson.name,new Date().toISOString(),null));
      });

      dispatch(addOrder(productList,new Date().toISOString(),totalPrice,curUser.address,new Date().toISOString()));

      dispatch(removeAllCart());
      props.navigation.navigate({routeName: 'overview'});
    };

    return(
        <View style={styles.screen}>
            <View style={styles.totalContainer}>
                <Text style={styles.title}>Total</Text>
                <Text style={styles.value}> $ {totalPrice}</Text>
                <Button style={styles.button} title='Order Now' color='orange' onPress={orderProduct}/>
            </View>
            <FlatList data={cartItem} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                return(
                    <CartItem title={products.find(pro => pro.id === data.item.proId).title}
                              color={data.item.color} quantity={data.item.quantity} price={data.item.price} id={data.item.id}/>
                )
            }}/>
        </View>
    )
};

CartScreen.navigationOptions = {
    headerTitle: 'Cart',
    headerTitleAlign: 'center',
};

const styles = StyleSheet.create({
   screen: {
       marginHorizontal: 20,
       marginVertical: 20
   },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 25,
        backgroundColor: '#eee3dd'
    },
    title: {
        fontFamily: 'roboto',
        fontSize: 20
    },
    value: {
        fontFamily: 'roboto-italic',
        fontSize: 16
    },
    button: {

    }
});

export default CartScreen;