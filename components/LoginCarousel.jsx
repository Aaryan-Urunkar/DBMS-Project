"use client"
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel'
import Image from "next/image"

const images = [{imgUrl:"/assets/auction-item.jpeg" , alt:"Image-1"} ,
                {imgUrl : "/assets/auctioning-people.png" , alt:"Image-2"},
                {imgUrl : "/assets/auction-painting.jpeg" , alt:"Image-2"},
]

const LoginCarousel = () => {
  return (
    <div className="">
      <Carousel 
      showThumbs={false} 
      infiniteLoop
      interval={3000}
      showArrows={false}
      showStatus={false}
      autoPlay={true}
      >
        {images.map((img) =>{
          return <Image 
                    src={img.imgUrl}
                    alt={img.alt}
                    width={484}
                    height={484}
                    key={img.alt}
                    className="object-contain"
                    ></Image>
        })}
      </Carousel>

    
    </div>
  )
}

export default LoginCarousel