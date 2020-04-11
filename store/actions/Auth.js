import { SIGN_UP } from './types'

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
                throw new Error('Something went wrong!');
            }
            
            const resData = await response.json();
            console.log(resData);
        dispatch({
            type: SIGN_UP
        })
    }
    
};