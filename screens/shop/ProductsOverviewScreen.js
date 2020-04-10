import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, FlatList, Platform, ActivityIndicator } from 'react-native'

import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

import * as cartActions from '../../store/actions/cart';
import * as productsAtions from '../../store/actions/products';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

import Colors from '../../constants/colors';

const ProductsOverviewScreen = (props) => {
    const [isLoading, setisLoading] = useState(false)
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadProducts = async () =>{
            setisLoading(true);
           await dispatch(productsAtions.fetchProducts());
            setisLoading(false)
        };
        loadProducts();
    }, [dispatch])

    const selectItemHandler = (id, title) =>{
        props.navigation.navigate('ProductDetail',{
            productId: id,
            productTitle: title
        })
    };

    if(isLoading){
        return <View style={styles.spinner}>
            <ActivityIndicator size="large" color={Colors.primary} />
        </View>
    }

    // console.log(products);
    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem 
                image={itemData.item.imageUrl} 
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                >
                    <Button 
                        title="View Detials" 
                        color={Colors.primary} 
                        onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)} 
                    />
                    <Button 
                        title="To Cart" 
                        onPress={() => dispatch(cartActions.addToCart(itemData.item)) } />   
                </ProductItem>}  
        />
    )
};

    ProductsOverviewScreen.navigationOptions = navData =>{
        return{
            headerTitle: 'All Products',
            headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item 
                        title="Menu" 
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                        onPress={() => navData.navigation.toggleDrawer()}
                        />
                </HeaderButtons>,
            headerRight:() => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title="Cart" 
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                    onPress={() => navData.navigation.navigate('Cart')}
                    />
            </HeaderButtons>
        };
    }

export default ProductsOverviewScreen

const styles = StyleSheet.create({
    spinner:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
