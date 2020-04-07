import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

import Colors from '../constants/colors';

import { Platform } from 'react-native';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductScreen from '../screens/user/UserProductScreen';

import { Ionicons } from '@expo/vector-icons';

const defaultNavOptions ={
    headerStyle:{
        backgroundColor: Platform.OS === 'android' ? Colors.secondary : '#fff'
    },
    headerTitleStyle:{
        fontFamily:'abrilFatface'
    },
    headerTintColor: Platform.OS === 'android' ? '#100' : Colors.secondary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig =>(
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                size={23}
                color={drawerConfig.tintColor}    
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig =>(
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} 
                size={23}
                color={drawerConfig.tintColor}    
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const AdminNavigator = createStackNavigator({
    UserProduct: UserProductScreen
},{
    navigationOptions:{
        drawerIcon: drawerConfig =>(
            <Ionicons 
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                size={23}
                color={drawerConfig.tintColor}    
            />
        )
    },
    defaultNavigationOptions: defaultNavOptions
});

const ShopNavigator= createDrawerNavigator({
    products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
},{
    contentoptions:{
        activeTintColor: Colors.primary
    }
});


export default createAppContainer(ShopNavigator);