import { AsyncStorage } from 'react-native';

import { SIGNUP, LOGIN, AUTHENTICATE } from './types'

export const authenticate = (token, userId) =>{
    return{
        type: AUTHENTICATE,
        token,
        userId
    }
}

export const signUp = (email, password) =>{
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnZfiJ85V7hgcdug_KsPUlc7BI_PpOj0I',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
            if (!response.ok) {
                // throw new Error('Something went wrong!');
                if (!response.ok) {
                    const errorResData = await response.json();
                    const errorMsg = errorResData.error.message;
                    // console.log(errorMsg)
                    let msg = 'Something went wrong';
                    if(errorMsg === 'EMAIL_EXISTS'){
                        msg = 'This Email is exist!'
                    }
                    throw new Error(msg)
                 }
            }
            
            const resData = await response.json();
            console.log('sign up',resData);
        // dispatch({
        //     type: SIGNUP,
        //     token: resData.idToken,
        //     userId: resData.localId
        // })
        dispatch(authenticate(resData.idToken, resData.localId))
        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate )
    }  
};

export const logIn = (email, password) =>{
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnZfiJ85V7hgcdug_KsPUlc7BI_PpOj0I',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });
            if (!response.ok) {
               const errorResData = await response.json();
               const errorMsg = errorResData.error.message;
               let msg = 'Something went wrong';
               if(errorMsg === 'INVALID_EMAIL'){
                   msg = 'This Email Could not be found!'
               }else if(errorMsg === 'MISSING_PASSWORD'){
                   msg = 'This password in not valid!'
               }
            //    console.log('log in',msg);
               throw new Error(msg)
            }

            const resData = await response.json();
            console.log('log in',resData);
        // dispatch({
        //     type: LOGIN,
        //     token: resData.idToken,
        //     userId: resData.localId
        // })
        dispatch(authenticate(resData.idToken, resData.localId))

        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate )
    }
    
};

const saveDataToStorage = (token, userId, expirationDate) =>{
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }))
}