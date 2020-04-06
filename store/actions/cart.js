import { ADD_TO_CART, REMOVE_FROM_CART } from './types';

export const addToCart = product =>{
    // console.log('product',product)
    return{
        type:ADD_TO_CART,
        product: product
    }
};

export const removeFromCart = productId =>{
    return{
        type: REMOVE_FROM_CART,
        pid: productId
    }
};