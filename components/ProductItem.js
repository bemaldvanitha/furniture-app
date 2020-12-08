import React from 'react';
import {View,StyleSheet,Text,Image,Platform,Dimensions,TouchableOpacity,ToastAndroid} from 'react-native';
import {Ionicons,Entypo,AntDesign} from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux';

import Colors from "../constans/Colors";
import {toggleFavorite} from '../store/actions/furnitureActions';

const ProductItem = (props) => {
    const isFav = useSelector(store => store.furniture.wishListProducts).findIndex(pro => pro.id === props.id);
    const dispatch = useDispatch();
    const isEdit = props.isEdit;

    const displayToast = () => {
      if(isFav >= 0){
          ToastAndroid.show('Remove From WishList',ToastAndroid.SHORT);
      }else{
          ToastAndroid.show('Added to WishList',ToastAndroid.SHORT);
      }
    };

    return(
        <TouchableOpacity onPress={props.onSelect}>
            <View style={styles.card}>
                <View style={styles.displayPanel}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri: props.image}} style={styles.image}/>
                    </View>
                    <View style={styles.detailContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={styles.detail}>{props.detail}</Text>
                        <Text multiline={true} style={styles.price}> $ {props.price.toFixed(2)}</Text>
                    </View>
                </View>
                {   !isEdit && <View style={styles.actionBar}>
                        <Ionicons name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} color={Colors.accent} size={38}/>
                        <Ionicons name={isFav >= 0 ? 'ios-heart' : 'ios-heart-empty'} color={Colors.accent} size={28} onPress={() => {
                            displayToast();
                            dispatch(toggleFavorite(props.id,isFav === -1 ? false : true));
                        }}/>
                    </View>
                }
                {   isEdit && <View style={styles.actionBar}>
                        <Entypo name="pencil" size={38} color={Colors.accent} onPress={props.editPress}/>
                        <AntDesign name="delete" size={38} color={Colors.accent} onPress={props.deletePress}/>
                    </View>
                }
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('screen').width * 0.95,
        height: Dimensions.get('screen').height * 0.25,
        flex: 1,
        marginBottom: 20,
        justifyContent: 'space-between',
        backgroundColor: Colors.background,
        borderRadius: 15,
        elevation: 7,
        shadowColor: 'black',
        shadowRadius: 15,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.26
    },
    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 5
    },
    displayPanel: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.secondary
    },
    imageContainer: {

    },
    detailContainer: {
        //justifyContent: 'space-around',
    },
    image: {
        width: Dimensions.get('screen').width * 0.3,
        height: Dimensions.get('screen').height * 0.16,
    },
    title: {
        fontSize: 20,
        fontFamily: 'roboto-bold'
    },
    detail: {
        fontSize: 12,
        fontFamily: 'roboto-light'
    },
    price: {
        fontSize: 14,
        fontFamily: 'roboto-black'
    }
});

export default ProductItem;