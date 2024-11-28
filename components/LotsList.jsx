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
            const response = await axios.get("/api/lot" , {
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

    <div className=' text-black  min-h-screen box-border flex flex-wrap justify-center gap-8 overflow-x-hidden'>
  {lots &&
    lots.map((lot) => (
      <LotCard
        key={lot._id}
        lot={lot}
        onClick={() => router.push(`/buyer/${lot._id}` )}
      />
    ))}
</div>
  )
}

export default LotsList