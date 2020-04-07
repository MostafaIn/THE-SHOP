import React from 'react'
import { StyleSheet, Text, View, Button, FlatList } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/colors';

import CartItem from '../../components/shop/CartItem';

import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import Card from '../../components/UI/Card';

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
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });
    
    const dispatch = useDispatch();
    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>$ {Math.round(cartTotalAmount.toFixed(2)) * 100 / 100}</Text>
                </Text>
                <Button 
                    title="Order NOW"
                    color={Colors.secondary}
                    disabled={cartItems.length === 0}
                    onPress={() =>{
                        dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
                    }}
                />
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => <CartItem 
                                quantity={itemData.item.quantity}
                                title={itemData.item.productTitle}
                                amount={itemData.item.sum}
                                deletable
                                onRemove={() => dispatch(cartActions.removeFromCart(itemData.item.productId))}
                            />}
            />
        </View>
    )
};

    CartScreen.navigationOptions ={
        headerTitle: 'Your Cart'
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
        padding:10
    },
    summaryText:{
        fontFamily:'lobster',
        fontSize:18
    },
    amount:{
        color: Colors.primary
    }
})
