"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Select, Textarea } from '@nextui-org/react';
import { useParams } from 'next/navigation';

const AddLotPage = () => {

    const params = useParams();
    const {id} = params;
    

  const [lotData, setLotData] = useState({
    artistName: '',
    name: '',
    lotStatus: 'ongoing',
    timeLeftBeforeKnockDown: 24,
    currentHighestBid: '',
    retailPrice: '',
    description: '',
    auctionHouseOfIssuance : `${id}`,
    image : ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLotData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/lot/create', lotData , {
        headers : {
          authorization : localStorage.getItem("jwtToken")
        }
      });
      alert('Lot added successfully');
      setLotData({
        artistName: '',
        name: '',
        lotStatus: 'ongoing',
        timeLeftBeforeKnockDown: 24,
        currentHighestBid: '',
        retailPrice: '',
        description: '',
        auctionHouseOfIssuance : "",
        image : null
      });
    } catch (error) {
      console.error('Error adding lot:', error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen py-10 bg-gray-900 ">
      <h1 className="text-3xl font-bold mb-6 text-white">Add New Lot</h1>
      <form onSubmit={handleSubmit} className="  w-3/4 max-w-lg space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        
        <Input
          // label="Artist Name"
          name="artistName"
          placeholder="Enter artist's name"
          value={lotData.artistName}
          onChange={handleChange}
          className="w-full bg-white"
        />
        
        <Input
          // label="Lot Name"
          name="name"
          required
          placeholder="Enter lot name"
          value={lotData.name}
          onChange={handleChange}
          className="w-full bg-white"
        />

        <Input
          // label="Image"
          name="image"
          placeholder="Enter image link"
          value={lotData.image}
          onChange={handleChange}
          className="w-full bg-white"
        />
        
        <select
          // label="Lot Status"
          name="lotStatus"
          onChange={(e) => setLotData((prevData) => ({ ...prevData, lotStatus: e.target.value }))}
          value={lotData.lotStatus}
          className="w-full bg-white"
        >
          <option value="sold" className='text-black'>Sold</option>
          <option value="unsold" className='text-black'>Unsold</option>
          <option value="ongoing" className='text-black'>Ongoing</option>
        </select>
        
        <Input
          // label="Time Left Before Knock Down (hrs)"
          type="number"
          name="timeLeftBeforeKnockDown"
          placeholder="Enter time left in hours"
          value={lotData.timeLeftBeforeKnockDown}
          onChange={handleChange}
          className="w-full bg-white"
        />
        
        <Input
          // label="Current Highest Bid"
          type="number"
          name="currentHighestBid"
          placeholder="Enter current highest bid"
          value={lotData.currentHighestBid}
          onChange={handleChange}
          className="w-full bg-white"
        />
        
        <Input
          // label="Retail Price"
          type="number"
          name="retailPrice"
          required
          placeholder="Enter retail price"
          value={lotData.retailPrice}
          onChange={handleChange}
          className="w-full bg-white"
        />
        
        <Textarea
          // label="Description"
          name="description"
          placeholder="Enter description"
          value={lotData.description}
          onChange={handleChange}
          className="w-full bg-white"
        />
        
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-md">
          Add Lot
        </Button>
      </form>
    </div>
  );
};

export default AddLotPage;
