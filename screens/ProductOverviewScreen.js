import React,{useEffect} from 'react';
import {View,Text,StyleSheet,Platform,FlatList,Dimensions,ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useSelector,useDispatch} from 'react-redux';

import Colors from "../constans/Colors";
import ProductItem from "../components/ProductItem";
import {fetchAll} from '../store/actions/furnitureActions';
import {fetchCurrentUser} from '../store/actions/userActions';
//import FurnitureCarousel from '../components/Carousel';

const ProductOverviewScreen = (props) => {
    const products = useSelector(store => store.furniture.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAll());
        dispatch(fetchCurrentUser());
    },[dispatch]);

    if(products.length === 0 ){
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' color={Colors.accent}/>
                <Text>No data or Loading</Text>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            <FlatList data={products} keyExtractor={(item,index) => item.id} renderItem={(data) => {
                return(
                    <ProductItem id={data.item.id} image={data.item.imageUrl} title={data.item.title} detail={data.item.description} price={data.item.price} onSelect={() => {
                        props.navigation.navigate({routeName: 'detail',params: {id: data.item.id}})
                    }}/>
                )
            }}/>
        </View>
    )
};

ProductOverviewScreen.navigationOptions = navData =>  {
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
    carousel: {
        height: Dimensions.get('screen').height * 0.35,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ProductOverviewScreen;