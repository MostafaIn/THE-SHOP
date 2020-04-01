import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';

import Colors from '../constants/colors';

import { Platform } from 'react-native';

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
},{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: Platform.OS === 'android' ? Colors.secondary : '#fff'
        },
        headerTintColor: Platform.OS === 'android' ? '#100' : Colors.secondary
    }
});

export default createAppContainer(ProductsNavigator);