import React,{useEffect} from 'react';
import {View,Text,StyleSheet,FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {Categories} from '../data/dummy-data';
import ProductItem from "../components/ProductItem";

const CategoryItemsListScreen = (props) => {
    const categoryId = props.navigation.getParam('id');
    const products = useSelector(store => store.furniture.products);
    const categoryProduct = products.filter(pro => pro.catId === categoryId);
    const categoryTitle = Categories.find(cat => cat.id === categoryId);

    useEffect(() => {
        props.navigation.setParams({'title': categoryTitle});
    },[categoryTitle]);

    if(!products){
        return (
            <View style={styles.altScreen}>
                <Text style={styles.altText}>No Products In this Category</Text>
            </View>
        )
    }

    return(
        <View style={styles.screen}>
            <FlatList data={categoryProduct} keyExtractor={(item,index) => item.id} renderItem={data => {
                return(
                    <ProductItem id={data.item.id} image={data.item.imageUrl} title={data.item.title} detail={data.item.description} price={data.item.price} onSelect={() => {
                        props.navigation.navigate({routeName: 'detail',params: {id: data.item.id}})
                    }}/>
                )
            }}/>
        </View>
    )
};

CategoryItemsListScreen.navigationOptions = navData =>  {
    const categoryTitle = navData.navigation.getParam('title');
    return{
        headerTitle: categoryTitle,
        headerTitleAlign: 'center',
    }
};

const styles = StyleSheet.create({
    screen: {
        marginVertical: 5,
        marginHorizontal: 10
    },
    altScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    altText: {
        fontFamily: 'roboto',
        fontSize: 16
    }
});

export default CategoryItemsListScreen;