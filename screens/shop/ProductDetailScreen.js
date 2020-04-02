import React from 'react'
import { StyleSheet, Text, View, ScrollView, Button, Image } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/colors';

import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = (props) => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state => state.products.availableProducts.find(p => p.id === productId))
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.img} source={{uri: selectedProduct.imageUrl}} />
            <View style={styles.btn}>
                <Button 
                    title="Add To Cart" 
                    color={Colors.primary} 
                    onPress={() => dispatch(cartActions.addToCart(selectedProduct))} />
            </View>
            <Text style={styles.price}>{selectedProduct.price.toFixed(2)} $</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
};

    ProductDetailScreen.navigationOptions = navData =>{
        return{
            headerTitle: navData.navigation.getParam('productTitle')
        }
    };

export default ProductDetailScreen

const styles = StyleSheet.create({
    img:{
        width:'100%',
        height: 300
    },
    price:{
        fontSize: 20,
        fontFamily:'orbitron',
        color:'#888',
        textAlign:'center',
        marginVertical: 20
    },
    description:{
        fontSize: 14,
        textAlign:'center',
        marginHorizontal:20
    },
    btn:{
        marginVertical:12,
        width:400,
        alignItems:'center'
    }
})
