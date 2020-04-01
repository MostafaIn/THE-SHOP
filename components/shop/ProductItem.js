import React from 'react'
import { StyleSheet, Text, View, Image, Button, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'

import Colors from '../../constants/colors'

const ProductItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <TouchableCmp onPress={props.onViewDetail} useForeground>
        <View style={styles.product}>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={{uri: props.image}} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>$ {props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                <Button title="View Detials" color={Colors.primary} onPress={props.onViewDetail} />
                <Button title="To Cart" onPress={props.onAddToCart} />
            </View>
        </View>
        </TouchableCmp>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    product:{
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
        height: 300,
        margin: 20
    },
    imgContainer:{
        width:'100%',
        height:'60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow:'hidden'
    },  
    img:{
        width:'100%',
        height:'100%'
    },
    title:{
        fontSize:18,
        fontFamily:'lobster',
        marginVertical: 4
    },
    price:{
        fontSize:14,
        fontFamily:'orbitron',
        color:'#888'
    },
    details:{
        alignItems:'center',
        height:'15%',
        padding: 10
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        height:'25%',
        paddingHorizontal: 20
    }
})
