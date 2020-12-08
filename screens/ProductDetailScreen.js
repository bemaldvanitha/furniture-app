import React,{useEffect,useState,useCallback} from 'react';
import {View,Text,StyleSheet,Image,ScrollView,Dimensions,TouchableOpacity,ToastAndroid} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import {Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';
//import {Snackbar} from 'react-native-paper';
//import Snackbar from 'react-native-snackbar';

import Colors from "../constans/Colors";
import {toggleFavorite} from '../store/actions/furnitureActions';
import {addToCart} from '../store/actions/cartActions';

const ProductDetailScreen = (props) => {
    const proId = props.navigation.getParam('id');
    const product = useSelector(store => store.furniture.products).find(pro => pro.id === proId);
    const isCurProductFav = useSelector(store => store.furniture.wishListProducts.some(pro => pro.id === proId));
    const isFav = useSelector(store => store.furniture.wishListProducts).findIndex(pro => pro.id === props.id);

    const [amount,setAmount] = useState(1);
    const [color,setColor] = useState('brown');
    const dispatch = useDispatch();

    //console.log(isCurProductFav);

    const toggleFav = useCallback( () => {
        dispatch(toggleFavorite(proId,isFav === -1 ? false : true));
    },[dispatch,proId]);

    useEffect(() => {
        props.navigation.setParams({'toggleFav': toggleFav});
        props.navigation.setParams({'title': product.title});
        props.navigation.setParams({'isCurFav': isCurProductFav})
    },[product,toggleFav,isCurProductFav]);

    const showSnackBar = () => {
        ToastAndroid.show('Added to Cart',ToastAndroid.SHORT);
    };

    return(
        <ScrollView>
            <View style={styles.screen}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: product.imageUrl}}/>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.title}>{product.title}</Text>
                <Text numberOfLines={4} style={styles.description}>{product.description}</Text>
                <View style={styles.priceContainer}>
                    <View style={styles.button}>
                        <Ionicons name="ios-add" size={32} color={Colors.accent} onPress={() => {
                            if(amount < product.quantity) {
                                setAmount(amount + 1);
                            }
                        }}/>
                        <Text style={{fontSize: 22}}>{amount.toString()}</Text>
                        <Ionicons name="ios-remove" size={32} color={Colors.accent} onPress={() => {
                            if(amount > 0) {
                                setAmount(amount - 1);
                            }
                        }}/>
                    </View>
                    <Text style={styles.price}>$ {(product.price * amount).toFixed(2).toString()}</Text>
                </View>
                <View style={styles.colorPicker}>
                    {
                        product.color.map((col) => {
                            return(
                                <MaterialCommunityIcons key={col} name="checkbox-blank-circle" size={col.toString() === color ? 60 : 42} color={col} onPress={() => {
                                    setColor(col.toString());
                                }}/>
                            )
                        })
                    }
                </View>
                <TouchableOpacity onPress={() => {
                    dispatch(addToCart(amount,color,product.price,proId));
                    showSnackBar();
                }}>
                    <View style={styles.customButton}>
                        <Text style={styles.customButtonText}>Add To Cart</Text>
                    </View>
                </TouchableOpacity>
                <Text style={styles.other}>{product.manufacturer}</Text>
                <Text style={styles.other}>{product.manufacturedDate.toString().substring(0,10)}</Text>
            </View>
        </ScrollView>
    )
};

ProductDetailScreen.navigationOptions = navData => {
    const title = navData.navigation.getParam('title');
    const isCurFav = navData.navigation.getParam('isCurFav');
    const toggleFav = navData.navigation.getParam('toggleFav');
    return{
        headerTitle: title,
        headerTitleAlign: 'center',
        headerRight: () => {
            return(
                <View style={{paddingRight: 20,paddingTop: 15}}>
                    <Ionicons name={isCurFav ? 'ios-heart': 'ios-heart-empty'} size={23} color='white' onPress={toggleFav}/>
                </View>
            )
        }
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    imageContainer: {

    },
    image: {
      width: '100%',
      height: Dimensions.get('screen').height * 0.6,
    },
    container: {

    },
    title: {
        fontFamily: 'roboto-bold',
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 10
    },
    description: {
        fontFamily: 'roboto-light',
        fontSize: 16,
        textAlign: 'center'
    },
    price: {
        fontFamily: 'roboto'
    },
    priceContainer: {
        flexDirection: 'row',
        paddingHorizontal: 50,
        paddingVertical: 20,
        justifyContent: 'space-around'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        justifyContent: 'space-around',
        backgroundColor: Colors.background,
        borderRadius: 20
    },
    other: {
        fontFamily: 'sansita-swashed',
        fontSize: 15,
        textAlign: 'center',
        paddingVertical: 5
    },
    colorPicker: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20
    },
    customButton: {
        backgroundColor: Colors.accent,
        borderRadius: 10,
        marginHorizontal: 110,
        height: 30,
        alignItems: 'center'
    },
    customButtonText: {
        textAlign: 'center',
        fontFamily: 'roboto',
        fontSize: 15
    }
});

export default ProductDetailScreen;