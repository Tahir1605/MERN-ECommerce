import { createContext, use, useEffect, useState } from 'react';
// import { products } from '../assets/frontend_assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '$';
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token , setToken] = useState('');
  const navigate = useNavigate()

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
        toast.success('Quantity increased!');
      } else {
        cartData[itemId][size] = 1;
        toast.success('Item added to cart!');
      }
    } else {
      cartData[itemId] = { [size]: 1 };
      toast.success('Item added to cart!');
    }

    setCartItems(cartData);

    if(token){
      try {
         await axios.post(backendUrl + '/api/cart/add',{itemId, size}, 
          {headers: {token}})
      } catch (error) {

        console.log(error);
        toast.error(error.message);   
      }
    }

  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const qty = cartItems[itemId][size];
        if (qty > 0) {
          totalCount += qty;
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
      toast.info('Item removed from cart');
    } else {
      cartData[itemId][size] = quantity;
      toast.success('Cart updated');
    }

    setCartItems(cartData);
    

    if(token){

      try {

        await axios.post(backendUrl + '/api/cart/update',{itemId,size, quantity},{headers:{token}});
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        
      }
    }

  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);
      if (!itemInfo) continue;

      for (const size in cartItems[itemId]) {
        const qty = cartItems[itemId][size];
        if (qty > 0) {
          totalAmount += itemInfo.price * qty;
        }
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {

      const response = await axios.get(backendUrl + "/api/product/list");
      if(response.data.success){
        setProducts(response.data.products);
        
      }else{
        toast.error(response.data.message);
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const getUserCart = async (token) => {
    try {

      const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
      if(response.data.success){
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  useEffect(() => {
    getProductsData();
  }, [])

  useEffect(() => {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token')); 
      getUserCart(localStorage.getItem('token'));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

export { ShopContext };
export default ShopContextProvider;
