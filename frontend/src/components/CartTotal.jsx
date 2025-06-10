import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

function CartTotal() {
    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);
    const subTotal = getCartAmount();
    const shippingFee = getCartAmount() > 100 ? delivery_fee : 0;
    const totalAmount = subTotal + shippingFee;
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'}/>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
          <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>{currency}{subTotal}.00</p>
          </div>
          <hr />
          <div className='flex justify-between'>
             <p>Shipping Fee</p>
             <p>{currency}{shippingFee}.00</p>
          </div>
          <hr />
          <div className='flex justify-between'>
              <p>Total</p>
              <p>{currency}{totalAmount}.00</p>
          </div>
      </div>
    </div>
  )
}

export default CartTotal