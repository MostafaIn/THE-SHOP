import React,{ useState, useCallback, useReducer } from 'react'
import { StyleSheet, View, Button, ActivityIndicator } from 'react-native'

import Input from '../UI/Input'

import Colors from '../../constants/colors'

import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/Auth'

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


const Signup = () => {
    const [isLoading, setIsLoading] = useState(false)

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            fullName:'',
            email:'',
            password:'',
            confirmPassword:''
        },
        inputValidities: {
          fullName: RegExp(/^[a-zA-Z\s]{3,15}$/),
          email: false,
          password: false,
          confirmPassword: false
        },
        formIsValid: false
      });

    const authHandler = async () =>{
        setIsLoading(true);
        await dispatch(authActions.signUp(
                formState.inputValues.email,
                formState.inputValues.password
            ));
        setIsLoading(false);
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
        
    return (
        <View>
            <Input
                id="fullName"
                label="Full Name"
                keyboardType="default"
                required
                name
                Icon="account"
                errorText="Your name must between 3 to 15 characters!"
                onInputChange={inputChangeHandler}
                initialValue=""
            />
            <Input
                id="email"
                label="E-Mail"
                keyboardType="email-address"
                required
                email
                Icon="email"
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
                Icon="eye-off"
                autoCapitalize="none"
                errorText="Your password is not valid!"
                onInputChange={inputChangeHandler}
                initialValue=""
            />
            <Input
                id="password"
                label="Confirm Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={6}
                Icon="eye-off"
                autoCapitalize="none"
                errorText="Your password must be the same!"
                onInputChange={inputChangeHandler}
                initialValue=""
            />
            <View style={styles.btnContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={Colors.secondary} />
                ) : (
                    <Button 
                        title="Sign up" 
                        color={Colors.primary} 
                        onPress={authHandler} 
                    />
                )}
            </View>
        </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    btnContainer:{
        margin:10
    }
})
