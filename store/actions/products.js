import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from './types';

export const deleteProduct = productId =>{
    return{
        type:DELETE_PRODUCT,
        pid: productId
    }
};

export const createProduct = (title, imageUrl, description, price) =>{
    return{
            type: CREATE_PRODUCT,
            productData:{
                title,
                imageUrl,
                description,
                price
            }
        }
};

export const updateProduct = (id, title, imageUrl, description) =>{
    console.log('UPDATED', description)
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