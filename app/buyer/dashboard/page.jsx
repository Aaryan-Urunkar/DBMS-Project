"use client";
import React, { useState } from "react";
import UserNav from "@/components/UserNav";
import LotsList from "@/components/LotsList";
import Inventory from "@/components/Inventory";

const UserPage = () => {
  const [activeTab, setActiveTab] = useState("lots"); // Default to "lots"

  const renderActiveTab = () => {
    switch (activeTab) {
      case "lots":
        return <LotsList />;
      case "inventory":
        return <Inventory />;
      default:
        return <LotsList />;
    }
  };

  return (
    <div className="w-full max-w-full">
      {/* Pass setActiveTab to UserNav to handle tab switching */}
      <UserNav setActiveTab={setActiveTab} />
      {renderActiveTab()}
    </div>
  );
};

export default UserPage;
