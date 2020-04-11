import React from 'react'
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Button } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'

import Colors from '../../constants/colors'

const AuthScreen = () => {
    return (
        <KeyboardAvoidingView 
            behavior="padding"
            style={styles.screen}
        >
            <LinearGradient colors={['#6fb', '#61e']} style={styles.gradient}>
            <Card style={styles.authContainer}>
                <ScrollView>
                    <Input
                        id="email"
                        label="E-Mail"
                        keyboardType="email-address"
                        required
                        email
                        autoCapitalize="none"
                        errorMessage="Please Enter a valid email address!"
                        onInputChange={()=>{}}
                        initialValue=""
                    />
                    <Input
                        id="password"
                        label="password"
                        keyboardType="default"
                        secureTextEntry
                        required
                        minLength={6}
                        autoCapitalize="none"
                        errorMessage="Please Enter a valid email address!"
                        onInputChange={()=>{}}
                        initialValue=""
                    />
                    <View style={styles.btnContainer}>
                    <Button title="Login" color={Colors.primary} onPress={() =>{}} />
                    </View>
                    <View style={styles.btnContainer}>
                    <Button title="Switch to Sign Up" color={Colors.secondary} onPress={() =>{}} />
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
        maxHeight:400,
        padding:10
    },
    gradient:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    btnContainer:{
        margin:10
    }
})
