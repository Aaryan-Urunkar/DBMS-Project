"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Textarea } from '@nextui-org/react';

const BidPage = () => {
    const params = useParams();
    const router = useRouter();
    const [lot, setLot] = useState(null);
    const [bidAmount, setBidAmount] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        const getLot = async () => {
            try {
                const response = await axios.get("/api/lot/fetchOne", {
                    headers: {
                        authorization: localStorage.getItem("jwtToken")
                    },
                    params: {
                        lotId: params.id
                    }
                });
                console.log(response);
                setLot(response.data.lot);
            } catch (error) {
                console.log(error);
            }
        };
        getLot();
    }, [params.id]);

    const handleBidSubmit = async (e) => {
        e.preventDefault();

        if (!bidAmount || isNaN(bidAmount)) {
            setModalMessage("Please enter a valid bid amount.");
            setIsModalOpen(true);
            return;
        }

        if (bidAmount <= lot.currentHighestBid) {
            setModalMessage("Your bid must be higher than the current highest bid.");
            setIsModalOpen(true);
            return;
        }

        // Assuming you have user information stored or accessible
        const userId = extractUserIdFromToken(localStorage.getItem("jwtToken"));

        if (lot.highestBidder && lot.highestBidder === userId) {
            setModalMessage("You are already the highest bidder.");
            setIsModalOpen(true);
            return;
        }

        try {
            const response = await axios.post("/api/lot/bid", {
                lotId: lot._id,
                bidAmount: Number(bidAmount)
            }, {
                headers: {
                    authorization: localStorage.getItem("jwtToken")
                }
            });

            if (response.status === 200) {
                setModalMessage("Bid placed successfully!");
                setIsModalOpen(true);
                // Refresh lot data
                const updatedLot = await axios.get("http://localhost:3000/api/lot/fetchOne", {
                    headers: {
                        authorization: localStorage.getItem("jwtToken")
                    },
                    params: {
                        lotId: params.id
                    }
                });
                setLot(updatedLot.data.lot);
                setBidAmount('');
            }
        } catch (error) {
            console.log(error);
            setModalMessage("Failed to place bid. Please try again.");
            setIsModalOpen(true);
        }
    };

    // Helper function to extract user ID from JWT
    const extractUserIdFromToken = (token) => {
        if (!token) return null;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.name;
    };

    return (
        <div className='w-full min-h-screen flex flex-col md:flex-row bg-gray-100'>
            {/* Left part of page */}
            <div className='w-full md:w-1/2 flex justify-center items-center p-4'>
                {lot && lot.image ? (
                    <img src={lot.image} alt="Lot image" className='object-contain w-full h-auto max-w-md rounded-xl shadow-lg hover:scale-105 transition-transform duration-200' />
                ) : (
                    <p>No image available</p>
                )}
            </div>

            {/* Right part of page */}
            <div className='w-full md:w-1/2 flex flex-col items-center p-6 '>
                {lot ? (
                    <>
                        <h1 className='text-3xl font-bold mb-4'>Lot Details</h1>
                        <div className='w-full max-w-lg bg-white p-6 rounded-lg shadow-md'>
                            <p><strong>Artist Name:</strong> {lot.artistName || "N/A"}</p>
                            <p><strong>Lot Name:</strong> {lot.name}</p>
                            <p><strong>Status:</strong> {lot.lotStatus}</p>
                            <p><strong>Time Left Before Knock Down:</strong> {lot.timeLeftBeforeKnockDown} hours</p>
                            <p><strong>Current Highest Bid:</strong> ${lot.currentHighestBid || "0"}</p>
                            <p><strong>Retail Price:</strong> ${lot.retailPrice}</p>
                            <p><strong>Description:</strong> {lot.description || "No description provided."}</p>
                            <p><strong>Auction House:</strong> {lot.auctionHouseOfIssuance || "N/A"}</p>
                            <p><strong>Highest Bidder:</strong> {lot.highestBidder ? lot.highestBidder : "None"}</p>

                            {/* Bid Form */}
                            <form onSubmit={handleBidSubmit} className='mt-6'>
                                <Input
                                    clearable
                                    underlined
                                    labelPlaceholder="Your Bid Amount"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(e.target.value)}
                                    type="number"
                                    min={lot.currentHighestBid + 1}
                                    className="mb-4 w-full"
                                    required
                                />
                                <Button type="submit" color="primary" className="w-full">
                                    Place Bid
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <p>Loading lot details...</p>
                )}
            </div>

            {/* Modal for feedback */}
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalHeader>{modalMessage.includes("successfully") ? "Success" : "Error"}</ModalHeader>
                <ModalBody>
                    <p>{modalMessage}</p>
                </ModalBody>
                <ModalFooter>
                    <Button auto flat color="primary" onClick={() => setIsModalOpen(false)}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default BidPage;
