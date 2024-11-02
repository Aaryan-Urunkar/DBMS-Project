"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { useRouter } from "next/navigation";

const ConsignorDashboard = () => {
  const router = useRouter();
  const [allAuctionHouses, setAllAuctionHouses] = useState(null);
  const [showAuctionHouses, setShowAuctionHouses] = useState(true);
  const [showLots , setShowLots] = useState(false);
  const [showProfile , setShowProfile] = useState(false);
  useEffect(() => {
    const getAllAuctionHouses = async () => {
      const response = await axios
        .get("http://localhost:3000/api/auction-house", {
          headers: {
            authorization: localStorage.getItem("jwtToken"),
          },
        })
        .then(function (response) {
          console.log(response);
          setAllAuctionHouses(response.data.allAuctionHouses);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    getAllAuctionHouses();
  }, []);

  const onAuctionHouseClick = (aH) => {
    console.log(aH);
    router.push(`add-lot/${aH._id}`)
  }

  return (
    <>
      <section className="h-screen w-screen flex flex-col items-center">
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Chokokutai&display=swap" rel="stylesheet"></link>
        <h1 style={{fontFamily:"Chokokutai"}} className="mt-5 font-bold text-xl text-center">DASHBOARD</h1>
        <div className="w-[75%] flex justify-between m-20 font-serif">
          <span className=" hover:underline hover:scale-110">Auction Houses</span>
          <span className=" hover:underline hover:scale-110">Lots created</span>
          <span className=" hover:underline hover:scale-110">Profile</span>
        </div>
        <div className="w-[90%] flex flex-wrap justify-between">
          {
            allAuctionHouses 
            &&
            allAuctionHouses.map((auctionHouse) => {
              return (
                <div key={auctionHouse._id} onClick={() => onAuctionHouseClick(auctionHouse)} >
                    <Card  className="py-4 shadow-2xl hover:scale-125 duration-500">
                      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-xl  font-bold">Name : {auctionHouse.name}</p>
                        <h4 className="font-bold text-large">Fixed commission percentage : {auctionHouse.fixedCommissionPercentage} %</h4>
                      </CardHeader>
                      <CardBody className="overflow-visible py-2">
                        <Image
                          alt="Card background"
                          className="object-cover rounded-xl"
                          src={auctionHouse.image}
                          width={270}
                          height={350}
                          />
                      </CardBody>
                    </Card>
                  </div>
              )
            })
          }

        </div>
      </section>
    </>
  );
};

export default ConsignorDashboard;
