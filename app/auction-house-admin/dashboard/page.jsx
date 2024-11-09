"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";

const AuctionHouseAdminPage = () => {

  const router = useRouter()
  const [house , setHouse] = useState({})
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const deleteHouse = async()=>{
    
      const response  = await axios.post("http://localhost:3000/api/auction-house/delete" , {
        house
      } , {
        headers:{
          authorization : localStorage.getItem("jwtToken")
        }
      }).then(function(response){
        console.log("House successfully deleted");
        router.push("/")
      }).catch(function(err){
        console.log(err);
      })
  }
  
  useEffect(()=>{
    const getData = async() =>{
      const response  = await axios.
      get(`http://localhost:3000/api/auction-house/creator/`,{
        headers:{
          authorization : localStorage.getItem("jwtToken")
        }
      }).
      then(function(response){
        console.log(response);
        setHouse(response.data.house);

      }).
      catch(function(err){
        console.log(err);
      });
    }

    getData();
  } , [])

  return (
    <div className='w-screen h-screen flex flex-col md:flex-row'>


      {/* Left part of page */}
      <div className='w-screen md:w-[50%] flex justify-center items-center '>
        {house && house.image ? (
          <img src={house.image} alt="Auction House" className='object-contain md:w-[60%] md:h-[60%] rounded-xl shadow-lg hover:scale-110 duration-200 '/>
        ) : (
          <p>No image available</p>
        )}
      </div>

      {/* Right part of page */}
      <div className=' md:w-[50%] flex flex-col items-center'>
        <h1 className='mt-16 text-4xl font-bold'>YOUR STATS</h1>

        <span className='mt-[20%] text-xl'>NAME : {house.name}</span>
        <span className='mt-[10%] text-xl'>TOTAL EARNINGS : {house.totalEarnings}</span>
        <span className='mt-[10%] mb-[10%] text-xl'>FIXED COMMISSION PERCENTAGE : {house.fixedCommissionPercentage} </span>
        
        <Button onPress={onOpen} className="bg-red-400 p-6 px-10 rounded-md font-bold">Delete house</Button>
          <Modal isOpen={isOpen} backdrop={"blur"} onOpenChange={onOpenChange} size={"lg"} >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1 text-center">Delete auction house?</ModalHeader>
                  <ModalBody>
                    <p> 
                      Are you sure you want to delete your auction house?
                    </p>
                    <p>
                      This action is irreversible and may cause damage and/or loss of funds.
                    </p>
                    <p>
                      Please proceed by clicked "Delete" below if you have thought about your decision thoroughly.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" className="bg-red-700" onPress={deleteHouse}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal> 
      </div>
    </div>
  )
}


export default AuctionHouseAdminPage