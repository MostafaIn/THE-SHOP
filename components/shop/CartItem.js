import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

const CartItem = (props) => {
    return (
        <View style={styles.cartItem}>
            <Text style={styles.itemData}>
                <Text style={styles.mainTxt}>{props.quantity} </Text>
                <Text style={styles.title}> {props.title}</Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.mainTxt}>$ {props.amount.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity style={styles.delBTN} onPress={props.onRemove}>
                    <Ionicons 
                        name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color="red"
                    />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    cartItem:{
        padding:10,
        marginHorizontal:20,
        // backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    itemData:{
        flexDirection:'row',
        alignItems:'center',
    },
    mainTxt:{
        fontFamily:'orbitron',
        fontSize:16,
        color:'#777'
    },
    title:{
        fontFamily:'orbitron',
        fontSize:16
    },
    delBTN:{
        marginLeft:20
    }
})
