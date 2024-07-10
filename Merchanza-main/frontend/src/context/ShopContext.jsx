import React, { createContext, useState, useEffect } from 'react'
//import all_products from '../assets/all_products'
import CartItems from '../components/CartItems';

export const ShopContext = createContext(null)

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300; index++) { // all_products.length+1 -> 300
    cart[index] = 0;
  }
  return cart;
}


const ShopContextProvider = (props) => {

  const [all_products, setAll_products] = useState([])

  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch('http://localhost:4000/allproducts').then((response) => response.json()).then((data) => setAll_products(data))
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/getcart', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: "",
      }).then((response) => response.json()).then((data) => setCartItems(data));
    }
  }, []);


  const addToCart = (itemId) => {     // actualiza el estado
    setCartItems((prev) => ({...prev, [itemId]:prev[itemId] + 1}))    // prev hace referencia al valor del estado e itemId al id del pto
                                                                      // Para acceder al valor de ese pto utilizamos el identificador prev[itemId]
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:4000/addtocart', {                      // llama al endpoint /addtocart -> actualiza bd
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,      // enviando el token (contiene el id del usuario)
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId })                    // y el id del producto que se añade al carrito
      }).then((response) => response.json()).then((data) => console.log(data))
    }
  }                                                                   
  
  const removeToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/removefromcart', {                      // llama al endpoint /addtocart -> actualiza bd
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${localStorage.getItem('auth-token')}`,      // enviando el token (contiene el id del usuario)
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "itemId": itemId })                    // y el id del producto que se resta del carrito
      }).then((response) => response.json()).then((data) => console.log(data))
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {                                                     // item son claves (identificadores id)
      if (cartItems[item] > 0) {                                                        // cartItem[item] es el valor (cantidad) del producto agregado
        let itemInfo = all_products.find((product) => product.id === Number(item));     // Se busca en all_products ese producto 
        totalAmount += itemInfo.new_price * cartItems[item]                             // totalAmount = pto agregado * cantidad de ese pto  
      }
    }
    return totalAmount;
  }

  const getTotalCartItems = () => {
    let totalItem = 0;
    for(const item in cartItems){
      if(cartItems[item] > 0){
        totalItem += cartItems[item]                                                    // Aquí se suman los ptos agregados
      }
    }
    return totalItem;
  }
   
  const contextValue = {
    all_products, 
    cartItems, 
    addToCart, 
    removeToCart,
    getTotalCartAmount,
    getTotalCartItems,
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider