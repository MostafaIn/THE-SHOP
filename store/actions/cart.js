import { ADD_TO_CART } from './types';

export const addToCart = product =>{
    console.log('product',product)
    return{
        type:ADD_TO_CART,
        product: product
    }
};