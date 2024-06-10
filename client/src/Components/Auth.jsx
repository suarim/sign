import React, { useState } from 'react'
import '../App.css'
import {createuser, signed} from '../reducers/Authreducer' 
import { useDispatch, useSelector } from 'react-redux'
const Auth = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [auth,setAuth] = useState("signup")
    const {loading,error,token} = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const handlesubmit=()=>{
        if(auth=="signup"){
            dispatch(createuser({
                email:email,
                password:password
            }))
            console.log({email,password})
            setEmail("");
      setPassword("");
        }
        else{
            dispatch(signed({
                email:email,
                password:password
            }))
            console.log({email,password})
            setEmail("");
      setPassword("");
        }
    }
  return (
    <div className='container'>
    <div className='main'>
    <h2>Please {auth}</h2>
    {
        error?
        <h3>{error}</h3>:
        <></>
    }
      <input type='email' placeholder='enter email' className='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      <input type='password' placeholder='enter password' className='pass'value={password} onChange={(e)=>setPassword(e.target.value)}></input>
      <button className = 'btn' onClick={()=>handlesubmit()}>{auth}</button>
    {
        auth=='signin'?
        <h3 className="change" onClick={()=>setAuth("signup")}>Dont have an Account</h3>:
        <h3 className="change" onClick={()=>setAuth("signin")}>Already have an Account</h3>
    }
    </div>
    </div>
  )
}

export default Auth
