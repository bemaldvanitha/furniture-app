import React from 'react';
import {View, Text, StyleSheet, FlatList, Platform} from 'react-native';

import {Categories} from '../data/dummy-data';
import CategoryItem from "../components/CategoryItem";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../constans/Colors";

const CategoryScreen = (props) => {
    return(
        <View style={styles.screen}>
            <FlatList data={Categories} numColumns={2} keyExtractor={(item,key) => item.id} renderItem={(data) => {
                return(
                    <CategoryItem id={data.item.id} title={data.item.title} imageUrl={data.item.imageUrl} onSelect={() => {
                        props.navigation.navigate({routeName: 'categoryItems',params: {id: data.item.id}})
                    }}/>
                )
            }}/>
        </View>
    )
};

CategoryScreen.navigationOptions = navData => {
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
        marginHorizontal: 10,
        marginVertical: 20
    }
});

export default CategoryScreen;