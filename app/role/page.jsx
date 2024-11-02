"use client"
import React, { useRef, useState } from 'react'
import axios from 'axios'
import { motion } from "framer-motion";
import {useRouter} from "next/navigation"

const ChooseRole = () => {

    const router = useRouter();
  
    const [isAuctionHouseOwner , setIsAuctionHouseOwner] = useState(false)
    const [isBuyer , setIsBuyer] = useState(false)
    const [isConsignor , setIsConsignor] = useState(false)

    const nameRef = useRef(null);
    const fixedCommissionPercentageRef = useRef(null);
    const imgRef = useRef(null)

    const handleIsAuctionHouseOwner = (e) => {
        setIsAuctionHouseOwner(true)
        setIsBuyer(false)
        setIsConsignor(false)
    }
    const handleIsConsignor = (e) => {
        setIsAuctionHouseOwner(false)
        setIsBuyer(false)
        setIsConsignor(true)
    }
    const handleIsBuyer = (e) => {
        setIsAuctionHouseOwner(false)
        setIsBuyer(true)
        setIsConsignor(false)
    }

    const handleFormSubmit = async(e) =>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/auction-house/create" ,{
                auctionHouseName : nameRef.current.value,
                auctionHouseImage : imgRef.current.value,
                fixedCommissionPercentage : fixedCommissionPercentageRef.current.value
            },{
                headers:{
                    authorization : localStorage.getItem("jwtToken"),
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                console.log(response);
                router.push("/login")
            }).catch(function (error){
                console.log(error);
                
            }); 
        }catch(e){
            console.log(e);
            
        }
    }

    const handleSetRole =async(e) =>{
        try{

            const response = await axios.post("http://localhost:3000/api/user/set-role" , {
                role: (isBuyer && "buyer") || (isConsignor && "consignor")
            }, {
                headers:{
                    authorization : localStorage.getItem("jwtToken"),
                    'Content-Type': 'application/json'
                }
            }).then(function (response){
                console.log(response);

            }).catch(function (error){
                console.log(error);
            })

        }catch(e){
            console.log(e);
        }
    }

    return (
        <section className="w-screen h-screen flex flex-col items-center overflow-hidden relative bg-black text-white">

      {/* Animated Heading */}
      <motion.h1 
        className="mt-16 z-10 mb-12 font-extrabold text-5xl text-yellow-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        SELECT A ROLE
      </motion.h1>

      {/* Role Selection Buttons */}
      <div className="w-[80%] z-10 flex justify-around mb-12 space-x-4">
        <motion.button
          onClick={handleIsAuctionHouseOwner}
          className="bg-orange-800 px-6 py-3 w-[15%] font-mono text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Auction house owner
        </motion.button>
        <motion.button
          onClick={handleIsBuyer}
          className="bg-orange-800 px-6 py-3 w-[15%] font-mono text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Buyer
        </motion.button>
        <motion.button
          onClick={handleIsConsignor}
          className="bg-orange-800 px-6 py-3 w-[15%] font-mono text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Consignor
        </motion.button>
      </div>

      {/* Auction House Owner Form */}
      {isAuctionHouseOwner && (
        <motion.form
          onSubmit={handleFormSubmit}
          className="mt-16 z-10 w-full flex flex-col items-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex flex-col items-center w-[30%]">
            <label className="mb-2 text-xs text-gray-300" htmlFor="name">
              Auction house name
            </label>
            <motion.input
              ref={nameRef}
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="h-12 w-full bg-slate-600 text-white rounded-xl p-3 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
          <div className="flex flex-col items-center w-[30%]">
            <label
              className="mb-2 text-xs text-gray-300"
              htmlFor="fixedCommissionPercentage"
            >
              Fixed commission percentage
            </label>
            <motion.input
              ref={fixedCommissionPercentageRef}
              type="number"
              id="fixedCommissionPercentage"
              name="fixedCommissionPercentage"
              className="h-12 w-full bg-slate-600 text-white rounded-xl p-3 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
          <div className="flex flex-col items-center w-[30%]">
            <label className="mb-2 text-xs text-gray-300" htmlFor="image">
              Image link
            </label>
            <motion.input
              ref={imgRef}
              type="text"
              id="image"
              name="image"
              className="h-12 w-full bg-slate-600 text-white rounded-xl p-3 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
          <motion.button
            type="submit"
            className="bg-yellow-500 px-8 py-3 font-mono font-semibold text-gray-900 rounded-lg w-[15%] hover:bg-yellow-400 transition duration-200 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CREATE AUCTION HOUSE
          </motion.button>
        </motion.form>
      )}

      {/* Submit Button for Non-Auction House Owner */}
      {!isAuctionHouseOwner && (
        <motion.button
          type="submit"
          onClick={handleSetRole}
          className="bg-yellow-500 z-10 mt-48 px-8 py-3 font-mono font-bold text-gray-900 rounded-lg w-[15%] hover:bg-yellow-400 transition duration-200 shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SUBMIT
        </motion.button>
      )}
    </section>
  )
}

export default ChooseRole