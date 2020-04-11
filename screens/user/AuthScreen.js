import React,{ useReducer, useCallback} from 'react'
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Button } from 'react-native'

import { useDispatch } from 'react-redux'

import * as authActions from '../../store/actions/Auth'

import { LinearGradient } from 'expo-linear-gradient'

import Card from '../../components/UI/Card'
import Input from '../../components/UI/Input'

import Colors from '../../constants/colors'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';


const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues
      };
    }
    return state;
  };

const AuthScreen = () => {
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email:'',
            password:''
        },
        inputValidities: {
          email: false,
          password: false
        },
        formIsValid: false
      });

    const signUpHandler = () =>{
        dispatch(authActions.signUp(
            formState.inputValues.email,
            formState.inputValues.password
            )
        );
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
          dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
          });
        },
        [dispatchFormState]
      );
        
        console.log(formState.inputValues.email, formState.inputValues.password)
    return (
        <KeyboardAvoidingView 
            behavior="padding"
            keyboardVerticalOffset={50}
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
                        errorText="Please Enter a valid email address!"
                        onInputChange={inputChangeHandler}
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
                        errorText="Your password is not valid!"
                        onInputChange={inputChangeHandler}
                        initialValue=""
                    />
                    <View style={styles.btnContainer}>
                    <Button title="Login" color={Colors.primary} onPress={signUpHandler} />
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
