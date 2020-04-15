import { ADD_ORDER, SET_ORDERS } from './types';

import Order from '../../models/order'

export const fetchOrders = () =>{
    return async (dispatch, getState) =>{
        // any async code !!!
        const userId = getState().auth.userId;
        const response = await fetch(`https://shop-rn-ed880.firebaseio.com/orders/${userId}.json`);

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
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(`https://shop-rn-ed880.firebaseio.com/orders/${userId}.json?auth=${token}`,{
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
            throw new Error('somthing went wrong when adding an order!!!')
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