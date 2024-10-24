import axios from "axios";
import { createContext, useState } from "react";


export let CartContext = createContext();

export function CartContextProvider({ children }) {

    let [itemNum, setItemNum] = useState(0);

    function addToCart(productId) {
        let body = {
            productId: productId
        }
        let headersOptions = {
            token: localStorage.getItem('userToken')
        }

        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',body,{headers: headersOptions})
        
    }

    return <CartContext.Provider value={{addToCart, itemNum, setItemNum}}>
                {children}
            </CartContext.Provider>;
}