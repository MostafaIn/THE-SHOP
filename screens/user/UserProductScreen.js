import React from 'react'
import { StyleSheet, Text, View, Button, FlatList, Platform, Alert } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import * as productsActions from '../../store/actions/products';

import ProductItem from '../../components/shop/ProductItem';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constants/colors';

const UserProductScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);

    const dispatch = useDispatch();

    const editProductHandler = id =>{
        props.navigation.navigate('EditProduct',{ productId: id});
    };

    const deletehandler = (id) =>{
        Alert.alert('Are you sure ?', 'Do you really want to delete this item?',[
            {text: 'NO', style:'default'},
            {text:'YES', style:'destructive', onPress: () =>{
                dispatch(productsActions.deleteProduct(id))
            } }
        ])
      };

    if(userProducts.length === 0){
        return <View style={styles.noProduct}>
            <Text>No Products found!</Text>
            <Text> Start creating some </Text>
        </View>
    }

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>(
                 <ProductItem
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => editProductHandler(itemData.item.id)}
                >
                    <Button 
                        title="Edit" 
                        color={Colors.primary} 
                        onPress={() => editProductHandler(itemData.item.id)} 
                    />
                    <Button 
                        title="Delete" 
                        onPress={deletehandler.bind(this,itemData.item.id)} /> 
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
            headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title="Add" 
                        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                        onPress={() => navData.navigation.navigate('EditProduct')}
                        />
                </HeaderButtons>,
        }
    }

export default UserProductScreen

const styles = StyleSheet.create({
    noProduct:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
