"use client"
import {useRef} from 'react'
import LoginCarousel from '@/components/LoginCarousel'
import {useRouter} from 'next/navigation'
import axios from "axios"

const LoginPage = () => {

  const router = useRouter();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const login = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("/api/user/login" , {
          username:usernameRef.current.value,
          password : passwordRef.current.value
        }).then(function (response) {
          console.log(response);
          const jwtToken = response.data.token;
          if(jwtToken){
            localStorage.setItem("jwtToken" , `Bearer ${jwtToken}`);
          }
          
          if(response.data.role == "buyer"){
            router.push("/buyer/dashboard");
          }

          if(response.data.role === "auction house admin"){
            router.push("/auction-house-admin/dashboard")
          }

          if(response.data.role === "consignor"){
            router.push("/consignor/dashboard")
          }
        }).catch(function(e){
          throw new Error();
        })
        //console.log(`Response is : ${ response.data}`) 
    }catch(e){
      console.error("Error in axios POST request: ", e); 
    }
  }


  return (
    <>
    <section className='flex flex-col md:flex-row md:overflow-hidden '>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Chokokutai&display=swap" rel="stylesheet"></link>
      
      <div className='md:w-[70%] h-[50%] md:h-screen w-[100%]'>
        <LoginCarousel></LoginCarousel>
      </div>
      
      <div className='flex flex-col w-[100%]  h-screen md:w-[30%] items-center justify-center'>
        <h2 className='font-bold md:mt-4 text-center text-zinc-800 mb-2 text-3xl font-mono '>WELCOME BACK TO </h2>
        <span style={{fontFamily:"Chokokutai"}} className="font-bold mt-2 text-center text-yellow-500 mb-8 text-5xl">BID-BUD</span>
        <form onSubmit={login} className='flex flex-col h-[60%] '>

          <label className='mt-8 text-center font-semibold text-lg' htmlFor="username">Username</label>
          <input ref={usernameRef} type="text" id='username' className='h-12 w-72 bg-slate-300 rounded-md'/>
          

          <label className='mt-16 text-center font-semibold text-lg' htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" id='password' className='h-12 w-72 bg-slate-300 rounded-md'/>
        
          <button type="submit" className="font-bold mt-16 h-12 text-xl bg-orange-500 p-2 rounded-xl hover:bg-orange-400">LOGIN</button>
        </form>
      </div>
    </section>

    </>
  )
}

export default LoginPage