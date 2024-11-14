"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import LotCard from './LotDisplayCard'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const LotsList = () => {

    const [lots , setLots] = useState([])
    const router = useRouter();

    useEffect(() => {
        const getAllLots = async() => {
            const response = await axios.get("http://localhost:3000/api/lot" , {
                headers: {
                    authorization : localStorage.getItem("jwtToken")
                }
            }).then(function(response){
                console.log(response);
                setLots(response.data.allLots)
            }).catch(function(err){
                console.log(err);
            })
        }
        getAllLots();
        
    } , [])

  return (

    <div className='w-screen text-black h-screen flex flex-col md:flex-row md:flex-wrap md:justify-around overflow-x-hidden'>
        {lots && lots.map((lot) => {
            return (
                    <LotCard key={lot._id} lot={lot} onClick={() => router.push(`/buyer/${lot._id}`)}/>
            )
                    
        })}
    </div>
  )
}

export default LotsList