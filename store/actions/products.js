import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCT } from './types';

import Product from '../../models/product';

export const fetchProducts = () =>{
    return async (dispatch, getState) =>{
        // any async code !!!
        const userId = getState().auth.userId;
        try {
            const response = await fetch(`https://shop-rn-ed880.firebaseio.com/products.json`);
    
            const resData = await response.json();
            const loadedProducts = [];
    
            for(let key in resData){
                loadedProducts.push(new Product(
                    key,
                    resData[key].ownerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ))
            }
            dispatch({
                type: SET_PRODUCT,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            })
        } catch (err) {
            throw err
        }
    }
};

export const deleteProduct = productId =>{
    return async (dispatch, getState) =>{
        const token = getState().auth.token;
        await fetch(`https://shop-rn-ed880.firebaseio.com/products/${productId}.json?auth=${token}`,{
            method:'DELETE',
        });
        dispatch({
            type:DELETE_PRODUCT,
            pid: productId
        });
    };
};

export const createProduct = (title, imageUrl, description, price) =>{
    return async (dispatch, getState) =>{
        // any async code !!!
        console.log('getState: ',getState())
        const token = getState().auth.token;
        const userId = getState().auth.userId;

        const response = await fetch(`https://shop-rn-ed880.firebaseio.com/products.json?auth=${token}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                ownerId: userId,
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
                ownerId: userId,
                title,
                imageUrl,
                description,
                price
            }
        })
        }
};

export const updateProduct = (id, title, imageUrl, description) =>{
    return async (dispatch, getState) =>{
        const token = getState().auth.token;
        await fetch(`https://shop-rn-ed880.firebaseio.com/products/${id}.json?auth=${token}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description
            })
        });

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData:{
                title,
                imageUrl,
                description
            }
        })
    }
};

