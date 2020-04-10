import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from './types';

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
}