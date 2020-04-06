import React from 'react'
import { StyleSheet, Text, View, FlatList, Platform } from 'react-native'

import { useSelector } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const OrdersScreen = (props) => {
    const orders = useSelector(state => state.orders.orders);
    console.log(orders)
    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
        />
    )
};

    OrdersScreen.navigationOptions = navData =>{
        return{
            headerTitle: 'your orders',
            headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title="Menu" 
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                onPress={() => navData.navigation.toggleDrawer()}
                />
        </HeaderButtons>,
        }
    }

export default OrdersScreen

const styles = StyleSheet.create({})
