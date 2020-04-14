import { ADD_ORDER, SET_ORDERS } from './types';

import Order from '../../models/order'

export const fetchOrders = () =>{
    return async (dispatch, getState) =>{
        // any async code !!!
        // const token = getState().auth.token;
        const response = await fetch(`https://shop-rn-ed880.firebaseio.com/orders/u1.json`);

        const resData = await response.json();
        const loadedOrders = [];

        for(let key in resData){
            loadedOrders.push(new Order(
                key,
                resData[key].cartItems,
                resData[key].totalAmount,
                new Date(resData[key].date)
            ))
        }
        dispatch({
            type: SET_ORDERS,
            orders: loadedOrders
        })
    }
};

export const addOrder = ( cartItems, totalAmount) =>{
    return async (dispatch, getState) =>{
        const token = getState().auth.token;
        const date = new Date();
        const response = await fetch(`https://shop-rn-ed880.firebaseio.com/orders/u1.json?auth=${token}`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
               cartItems,
               totalAmount,
               data: date.toISOString() 
            })
        });

        if(!response.ok){
            throw new Error('somthing went wrong!!!')
        }

        const resData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData:{
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        })
    }
};