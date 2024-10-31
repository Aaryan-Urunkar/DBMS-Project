"use client"
import {useState , useRef} from "react";
import React from 'react'
import axios from "axios";
import { useRouter } from "next/navigation";

const Card = () => {

  const router = useRouter();
  const nameRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const createUser = async(e) => {
    e.preventDefault();
    try {

      const response = await axios.post("http://localhost:3000/api/user/register" , {
        name:nameRef.current.value,
        username:usernameRef.current.value,
        password : passwordRef.current.value
      }).then(function (response) {
        console.log(response);
        const jwtToken = response.data.token;
        if(jwtToken){
          localStorage.setItem("jwtToken" , `Bearer ${jwtToken}`);    
        }
        router.push("/role");
      }).catch(function(e){
        console.log(e.response);
        throw new Error();
      })
      //console.log(`Response is : ${response}`)
    } catch(e){
      console.error("Error while registering:", e); 
    }
    
    //console.log(nameRef.current.value, usernameRef.current.value, passwordRef.current.value);
    
  }

  return (
    <div className='bg-opacity-80 content text-xl rounded-xl w-80 md:w-96 h-[70%] md:h-[65%] bg-black  '>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Chokokutai&display=swap" rel="stylesheet"></link>
        <form onSubmit={createUser} className="flex flex-col flex-wrap content-center space-y-6">
          <h2  className='font-bold mt-4 text-center text-yellow-500 mb-2 text-4xl '>WELCOME TO </h2>
          <span style={{fontFamily:"Chokokutai"}} className="font-bold mt-2 text-center text-yellow-500 mb-8 text-4xl">BID-BUD</span>
          <input placeholder="Your name..." name="name" ref={nameRef} type="text" className='text-white h-12 w-[90%] md:w-[70%] rounded-lg bg-gray-700 bg-opacity-80 text-sm p-2' />
          <input placeholder="Your username..." name="username" type="text" ref={usernameRef} className='text-white h-12 w-[90%] md:w-[70%] rounded-lg bg-gray-700 bg-opacity-80 text-sm p-2' />
          <input placeholder="Your password..." name="password" type="password" ref={passwordRef} className='h-12 w-[90%] md:w-[70%] text-white rounded-lg bg-gray-700 bg-opacity-80 text-sm p-2' />
          <button type="submit" className=" bg-orange-500 p-2 rounded-xl hover:bg-orange-400">REGISTER</button>
          <a className="text-yellow-200  hover:text-blue-800 text-sm text-center" onClick={()=> router.push("/login")}>Already a user? Log in</a>
        </form>
    </div>
  )
}

export default Card