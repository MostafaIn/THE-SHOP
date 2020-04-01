import PRODUCTS from '../../data/dummy-data';

const initialState ={
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS
};

const products = (state = initialState, action) =>{
    return state;
};
export default products;