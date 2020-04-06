import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'

import { useSelector } from 'react-redux'

import Colors from '../../constants/colors';

import CartItem from '../../components/shop/CartItem';

const CartScreen = () => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount)
    const cartItems = useSelector(state =>{
        const transformedCartItems = [];
        for(let key in state.cart.items){
            transformedCartItems.push({
                productId: key,
                quantity: state.cart.items[key].quantity,
                productPrice: state.cart.items[key].productPrice,
                productTitle: state.cart.items[key].productTitle,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems;
    });
    // console.log('Cart Items', cartItems)
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>$ {cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button 
                    title="Order NOW"
                    color={Colors.secondary}
                    disabled={cartItems.length === 0}
                />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => <CartItem 
                                quantity={itemData.item.quantity}
                                title={itemData.item.productTitle}
                                amount={itemData.item.sum}
                            />}
            />
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    screen:{
        margin: 20,
    },
    summary:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom: 20,
        padding:10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset:{
            width: 0,
            height: 2
        },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor:'white',
    },
    summaryText:{
        fontFamily:'lobster',
        fontSize:18
    },
    amount:{
        color: Colors.primary
    }
})
