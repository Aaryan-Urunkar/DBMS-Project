// "use client";
// import React from "react";

// const Inventory = () => {
//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Inventory</h1>
//       {/* Add inventory-specific content here */}
//       <p>Here is your inventory of items.</p>
//     </div>
//   );
// };

// export default Inventory;

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Inventory = () => {
  const [lots, setLots] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get("/api/user/inventory/", {
          headers: {
            authorization: localStorage.getItem("jwtToken"),
          },
        });
        setLots(response.data.lots);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Inventory</h1>
      {lots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lots.map((lot) => (
            <div key={lot._id} className="p-4 border rounded-lg shadow-md hover:scale-110 duration-300">
              <img
                src={lot.image}
                alt={lot.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">{lot.name}</h2>
              <p className="text-gray-600">{lot.description}</p>
              <p className="text-sm text-green-600 font-semibold mt-2">
                Current Highest Bid: ${lot.currentHighestBid}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>You are not the highest bidder on any lots.</p>
      )}
    </div>
  );
};

export default Inventory;

