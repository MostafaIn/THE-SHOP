import React from 'react'
import { StyleSheet, Text, View, Button, FlatList, Platform } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import * as productsActions from '../../store/actions/products';

import ProductItem from '../../components/shop/ProductItem';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constants/colors';

const UserProductScreen = () => {
    const userProduct = useSelector(state => state.products.userProducts);

    const dispatch = useDispatch();

    return (
        <FlatList
            data={userProduct}
            keyExtractor={item => item.id}
            renderItem={itemData =>(
                 <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() =>{}}
                >
                    <Button 
                        title="Edit" 
                        color={Colors.primary} 
                        onPress={() => {}} 
                    />
                    <Button 
                        title="Delete" 
                        onPress={() => dispatch(productsActions.deleteProduct(itemData.item.id))} /> 
                </ProductItem>
            )}
                
        />
    )
};

    UserProductScreen.navigationOptions = navData =>{
        return{
            headerTitle:'your Products',
            headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title="Menu" 
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                        onPress={() => navData.navigation.toggleDrawer()}
                        />
                </HeaderButtons>,
        }
    }

export default UserProductScreen

const styles = StyleSheet.create({})
