import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCT } from './types';

import Product from '../../models/product';

export const deleteProduct = productId =>{
    return{
        type:DELETE_PRODUCT,
        pid: productId
    }
};

export const createProduct = (title, imageUrl, description, price) =>{
    return async dispatch =>{
        // any async code !!!
        const response = await fetch('https://shop-rn-ed880.firebaseio.com/products.json',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price
            })
        });

        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData:{
                id: resData.name,
                title,
                imageUrl,
                description,
                price
            }
        })
        }
};

export const updateProduct = (id, title, imageUrl, description) =>{
    return{
        type: UPDATE_PRODUCT,
        pid: id,
        productData:{
            title,
            imageUrl,
            description
        }
    }
};

export const fetchProducts = () =>{
    return async dispatch =>{
        // any async code !!!
        const response = await fetch('https://shop-rn-ed880.firebaseio.com/products.json');

        const resData = await response.json();
        const loadedProducts = [];

        for(let key in resData){
            loadedProducts.push(new Product(
                key,
                'u1',
                resData[key].title,
                resData[key].imageUrl,
                resData[key].description,
                resData[key].price
            ))
        }
        dispatch({
            type: SET_PRODUCT,
            products: loadedProducts
        })
    }
};