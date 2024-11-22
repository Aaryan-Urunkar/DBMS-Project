import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
} from "@nextui-org/react";
import axios from "axios";

const LotDisplayCard = ({ lot  , onClick}) => {

    const [aH , setAH] = useState(lot.auctionHouseOfIssuance)
    
    useEffect(() => {
        const getAh = async() => {
            const response = await axios.get(`http://localhost:3000/api/auction-house/get/${lot.auctionHouseOfIssuance}`)
                                    .then(function(response) {
                                        console.log(response.data.name);
                                        
                                        setAH(response.data.name)
                                    }).catch(function(err){
                                        console.log(err);
                                    })
        }
        getAh();
    } , [])


  return (
      <Card className="mt-3 py-4 shadow-2xl bg-yellow-100 rounded-xl hover:scale-125 duration-500 hover:z-10 md:w-[25%] h-[100%] ">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-2xl font-bold font-serif mb-4 text-black">{lot.name}</p>
          <small className="text-md uppercase font-bold text-black">Status : {lot.lotStatus}</small>
          <h4 className="font-bold text-large text-black">Artist : {lot.artistName}</h4>
          <h4 className="font-bold text-large text-black">Auction House : {aH}</h4>
        </CardHeader>
        <CardBody className="py-2">
          <Image 
            alt="Card background"
            className="object-contain rounded-xl h-[100%]"
            src={lot.image}
            width={320}
            height={270}
            onClick={onClick}
          />
        </CardBody>
        <CardFooter className="flex-col items-start">
          <h4 className="font-bold text-lg text-black">Retail Price : {lot.retailPrice} </h4>
          <h4 className="font-bold text-lg text-black">
            Highest Bid : {lot.currentHighestBid}
          </h4>
        </CardFooter>
      </Card>
  );
};

export default LotDisplayCard;
