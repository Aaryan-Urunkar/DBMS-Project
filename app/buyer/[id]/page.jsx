'use client'
import React from 'react' 
import { useParams } from 'next/navigation'

const BidPage = () => {
    const params = useParams()

    console.log(params);
    
  return (
    <div>BidPage</div>
  )
}

export default BidPage