import React,{ useState, useReducer, useCallback} from 'react'
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Button } from 'react-native'

import { useDispatch } from 'react-redux'

import * as authActions from '../../store/actions/Auth'

import { LinearGradient } from 'expo-linear-gradient'

import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'

import Colors from '../../constants/colors'

import Login from '../../components/auth/Login'
import Signup from '../../components/auth/Signup'


const AuthScreen = () => {
    const [isSignup, setIsSignup] = useState(false);    

    return (
        <KeyboardAvoidingView 
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#6fb', '#61e']} style={styles.gradient}>
            <Card style={styles.authContainer}>
                <ScrollView>
                    {!isSignup ? <Login /> : <Signup />}
                    
                    <View style={styles.btnContainer}>
                    <Button 
                        title={isSignup ? 'do you have account ?' : 'New Here ?'}
                        color={Colors.secondary} 
                        onPress={() => setIsSignup(prevState => !prevState)} 
                    />
                    </View>
                </ScrollView>
            </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    screen:{
        flex:1
    },
    authContainer:{
        width:'80%',
        maxWidth: 400,
        maxHeight:600,
        padding:10
    },
    gradient:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    btnContainer:{
        margin:10,
        borderWidth:1,
        borderColor:'#234',
        borderStyle:'dotted',
        borderRadius:20
    }
})
