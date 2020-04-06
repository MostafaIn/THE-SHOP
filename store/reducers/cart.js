import { ADD_TO_CART } from '../actions/types';

import CartItem from "../../models/cart-item";

const initialState ={
    items: {},
    totalAmount: 0   
};

export default (state=initialState, action) =>{
    switch (action.type) {
        case ADD_TO_CART:
            const addedProd = action.product;
            const prodPrice = addedProd.price;
            const prodTitle = addedProd.title;
            let updatedORnewCartItem;

            if(state.items[addedProd.id]){
                //already have the item in the cart
                updatedORnewCartItem = new CartItem(
                    state.items[addedProd.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProd.id].sum + prodPrice
                );
            }else{
                updatedORnewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
            }
            return{ 
                ...state, 
                items:{ ...state.items, [addedProd.id] : updatedORnewCartItem},
                totalAmount: state.totalAmount + prodPrice
            };    
        default:
            return state;
    }
}