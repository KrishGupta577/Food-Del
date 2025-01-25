import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,url,cartItems } = useContext(StoreContext)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name
    const value = event.target.value
    setData(data => ({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    let orderItems = []
    food_list.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item
        itemsInfo["quantity"] = cartItems[item._id] 
        orderItems.push(itemInfo)
      }
    })

    console.log(orderItems)
  }

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First Name' />
          <input onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email address' />
        <input onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City' />
          <input onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input onChange={onChangeHandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip code' />
          <input onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='Country' />
        </div>
        <input onChange={onChangeHandler} name='phone' value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='sumit' >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>

  )
}

export default PlaceOrder