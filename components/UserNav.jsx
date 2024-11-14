"use client"
import React, { useState } from 'react';
import { Navbar, NavbarContent, NavbarBrand, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Link } from "@nextui-org/react";


const MyNavbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar className="bg-black text-white py-6" onMenuOpenChange={setIsMenuOpen} maxWidth='full'>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Chokokutai&display=swap" rel="stylesheet"></link>

      {/* Left Content: Menu Toggle and Brand */}
      <NavbarContent className="">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-white"
          //onClick={handleMenuToggle}
          
        />
        <NavbarBrand>
          <p style={{ fontFamily: "Chokokutai" }} className="font-bold ">BID-BUD</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Center Content: Links (visible only on desktop) */}
      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            New Lots
          </Link>
        </NavbarItem>
        <NavbarItem >
          <Link href="#" >
            Inventory
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Profile
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Right Content: Logout Button */}
      <NavbarContent justify="end">
        <NavbarItem className=" lg:flex">
          <Button as={Link} color="primary" href="/login" onClick={() => localStorage.clear()} variant="flat">
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu (visible only when toggled) */}
      
      <NavbarMenu  className="bg-black text-white">
        <NavbarMenuItem className='mt-12'>
          <Link href="#">New Lots</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#">Inventory</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href="#">Profile</Link>
        </NavbarMenuItem>
      </NavbarMenu>
      
    </Navbar>
  );
};

export default MyNavbar;
