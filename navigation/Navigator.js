import React from 'react';
import {View,Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {FontAwesome5,AntDesign,MaterialIcons,Entypo,Feather} from '@expo/vector-icons';

import CartScreen from "../screens/CartScreen";
import CategoryItemsListScreen from "../screens/CategoryItemListScreen";
import CategoryScreen from "../screens/CategoryScreen";
import EditProductScreen from "../screens/EditProductScreen";
import EditUserDetailScreen from "../screens/EditUserDetailScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductOverviewScreen from "../screens/ProductOverviewScreen";
import UserProductScreen from "../screens/UserProductScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import WishListScreen from "../screens/WishListScreen";
import YourProductScreen from "../screens/YourOrderItemScreen";
import DrawerHeader from "../components/NavigationHeader";
import AuthScreen from "../screens/authScreen";

import Colors from "../constans/Colors";

const cartNavigator = createStackNavigator({
    cart: {
        screen: CartScreen
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontSize: 22
        },
    }
});

const HomeNavigator = createStackNavigator({
   overview: {
       screen: ProductOverviewScreen,
   },
   detail: {
       screen: ProductDetailScreen
   },
    cartNav: {
        screen: cartNavigator
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontSize: 22
        },
    }
});

const CategoryNavigator = createStackNavigator({
   category: {
       screen: CategoryScreen
   },
    categoryItems: {
       screen: CategoryItemsListScreen
    },
    detail: {
       screen: ProductDetailScreen
    },
    cartNav: {
        screen: cartNavigator
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontSize: 22
        },
    }
});

const wishListNavigator = createStackNavigator({
    wishList: {
        screen: WishListScreen
    },
    cartNav: {
        screen: cartNavigator
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontSize: 22
        },
    }
});

const userNavigator = createStackNavigator({
    user: {
        screen: UserProfileScreen
    },
    editUser: {
        screen: EditUserDetailScreen
    },
    cartNav: {
        screen: cartNavigator
    }
},{
   defaultNavigationOptions: {
       headerStyle: {
           backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
       },
       headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
       headerTitleStyle: {
           fontSize: 22
       },
   }
});

const ordersNavigator = createStackNavigator({
    orders: {
        screen: OrdersScreen
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontSize: 22
        },
        headerTitleAlign: 'center'
    },
    navigationOptions: {
        drawerIcon: (drawerInfo) => {
            return(
                <Entypo name="bookmark" size={24} color={drawerInfo.activeTintColor} />
            )
        }
    },
});

const sellerNavigator = createStackNavigator({
    userOrdered: {
        screen: UserProductScreen
    },
   seller: {
       screen: YourProductScreen
   },
    productEdit: {
       screen: EditProductScreen
    },
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontSize: 22
        },
    },
    navigationOptions: {
        drawerIcon: (drawerInfo) => {
            return(
                <Entypo name="shop" size={24} color={drawerInfo.activeTintColor} />
            )
        }
    }
});

/*const userOrderedNavigator = createStackNavigator({
    userOrdered: {
        screen: UserProductScreen
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontSize: 22
        },
    }
});*/

const tabNavigator = createBottomTabNavigator({
    home: {
        screen: HomeNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return(
                    <FontAwesome5 name="home" size={24} color={tabInfo.tintColor} />
                )
            },
            tabBarLabel: 'Home'
        }
    },
    categoryList: {
        screen: CategoryNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return(
                    <FontAwesome5 name="sitemap" size={24} color={tabInfo.tintColor} />
                )
            },
            tabBarLabel: 'Categories'
        },
    },
    wishListItem: {
        screen: wishListNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return(
                    <AntDesign name="heart" size={24} color={tabInfo.tintColor} />
                )
            },
            tabBarLabel: 'WishList'
        }
    },
    users: {
        screen: userNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return(
                    <MaterialIcons name="people" size={24} color={tabInfo.tintColor} />
                )
            },
            tabBarLabel: 'User'
        }
    }
},{
    tabBarOptions: {
        activeTintColor: Colors.accent
    },
    navigationOptions: {
        drawerIcon: (drawerInfo) => {
            return(
                <Feather name="shopping-bag" size={24} color={drawerInfo.activeTintColor} />
            )
        }
    }
});

const DrawerNavigator = createDrawerNavigator({
   Shop: {
       //screen: completeTabNavigator
       screen: tabNavigator
   },
    Orders : {
       screen: ordersNavigator,
    },
    Supplier: {
       screen: sellerNavigator
    }
},{
    contentOptions: {
        activeTintColor: Colors.primary,
        labelStyle: {
            fontSize: 24
        }
    },
    contentComponent: (props) => <DrawerHeader {...props}/>
});

const AuthNavigator = createStackNavigator({
    AuthScreenNav: AuthScreen
},{
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontSize: 22
        },
    }
});

const AdditionalNav = createStackNavigator({
    Additional: EditUserDetailScreen
},{
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
            fontSize: 22
        },
    }
});

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    AdditionalDetail: AdditionalNav,
    Shops: DrawerNavigator,
});

export default createAppContainer(MainNavigator);