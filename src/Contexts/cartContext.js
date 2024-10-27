import axios from "axios";
import { createContext, useState } from "react";


export let CartContext = createContext();

export function CartContextProvider({ children }) {

    let [itemNum, setItemNum] = useState(0);

    function addToCart(productId) {
        let body = {
            productId
        }
        let headersOptions = {
            token: localStorage.getItem('userToken')
        }

        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',body,{headers: headersOptions})
        
    }

    function getUserCart(){
        let headersOptions = {
            token: localStorage.getItem('userToken')
        }
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers: headersOptions})
    }

    function removeFromCart(id) {
        let headersOptions = {
            token: localStorage.getItem('userToken')
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers: headersOptions})
    }

    function updateCart(id, count) {
        let headersOptions = {
            token: localStorage.getItem('userToken')
        }
        let body = {
            count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, body, {headers: headersOptions});
    }

    function clearCart() {
        let headersOptions = {
            token: localStorage.getItem('userToken')
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers: headersOptions})
    }

    function checkoutPayment(id, data){
        let headersOptions = {
            token: localStorage.getItem('userToken')
        }
        let body = {
            shippingAddress: data
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000/Fresh-Cart`, body, {headers: headersOptions})
    }

    return <CartContext.Provider value={{itemNum, setItemNum, addToCart, getUserCart, removeFromCart, clearCart, updateCart, checkoutPayment}}>
                {children}
            </CartContext.Provider>;
}