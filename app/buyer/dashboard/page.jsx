"use server"
import React  from 'react';
import UserNav from "@/components/UserNav"
import LotsList from '@/components/LotsList';

const UserPage = () => {



  return (
    <div className='h-screen w-screen overflow-x-hidden'>
      <UserNav></UserNav>
      <LotsList></LotsList>
    </div>
  )
}

export default UserPage