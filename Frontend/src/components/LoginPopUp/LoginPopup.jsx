import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({ setShowLogin }) => {

    const {url,setToken,token} = useContext(StoreContext)
    const [currState, setCurrState] = useState('Login')
    const [data,setData] = useState({
        name:"",
        email:"",
        password:"",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setData(data => ({...data,[name]:value}))
    }

    const onLogin = async (event) => { 
        event.preventDefault()

        let newUrl = url
        if(currState === "Login") {
            newUrl += "/api/user/login" 
        }
        else{
            newUrl += "/api/user/register" 
        }

        const response = await axios.post(newUrl,data)

        if(response.data.success){
            setToken(response.data.token)
            console.log(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> :
                        <input onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required name="name" />
                    }
                    <input onChange={onChangeHandler} value={data.email}  type="email" placeholder='Your email' required name="email" />
                    <input onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required name="password" />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required name="" id="" />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login" 
                ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                : <p>Alredy have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}
export default LoginPopup