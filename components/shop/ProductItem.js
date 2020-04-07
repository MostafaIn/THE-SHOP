import React from 'react'
import { StyleSheet, Text, View, Image, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import Card from '../UI/Card';


const ProductItem = (props) => {
    let TouchableCmp = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <TouchableCmp onPress={props.onSelect} useForeground>
        <Card style={styles.product}>
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={{uri: props.image}} />
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>$ {props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
                {props.children}
            </View>
        </Card>
        </TouchableCmp>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    product:{
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
