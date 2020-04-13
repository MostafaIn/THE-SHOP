import React, { useState, useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [iconName, setIconName] = useState(props.Icon);

  const changeIcon = () =>{
    if(iconName === 'eye-off'){
      setIconName('eye')
    }else if(iconName === 'eye'){
      setIconName('eye-off')
    }else{
      setIconName(props.Icon)
    }
  };

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = text => {
    // console.log('text', text)
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const nameRegex = /^[a-zA-Z\s]{3,15}$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if(props.name && !nameRegex.test(text)){
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };
  // console.log('secure', isSecure)
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.inputField}>
        <TextInput
          {...props}
          secureTextEntry={(iconName === 'eye-off' && props.id === 'password') ? true : false}
          style={styles.input}
          value={inputState.value}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
        />
        <TouchableOpacity onPress={changeIcon}>
        <MaterialCommunityIcons name={iconName} size={20} color="#888" />
        </TouchableOpacity>
      </View>
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'lobster',
    marginVertical: 8
  },
  inputField:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomWidth:1,
    borderBottomColor: '#ccc',
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    minWidth:'80%'
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'orbitron',
    color: 'red',
    fontSize: 13
  }
});

export default Input;
