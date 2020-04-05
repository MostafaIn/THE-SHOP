import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

import Colors from '../constants/colors';

import { Platform } from 'react-native';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.secondary : '#fff'
        },
        headerTitleStyle:{
            fontFamily:'abrilFatface'
        },
        headerTintColor: Platform.OS === 'android' ? '#100' : Colors.secondary
    }
});

export default createAppContainer(ProductsNavigator);