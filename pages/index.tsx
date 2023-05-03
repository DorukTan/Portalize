import Image from 'next/image'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import Header from './components/header'
import '@splidejs/react-splide/css/sea-green';
import Slider from './components/slider'



export default function Home() {
  return (
    <div className="h-screen bg-fixed bg-center bg-cover bg-red-700 flex-col flex overflow-hidden">
      <Header/>
      <div className='h-screen md:scale-75 '>
        <Slider 
          slides={[ 
              {bg:"ascent", link:"classic", buttonText:"Play", text:"GUESS THE MAP"},
              {bg:"ascent", link:"classic", buttonText:"Play", text:"GUESS THE QUOTE"},
              {bg:"ascent", link:"classic", buttonText:"Play", text:"GUESS THE BUNDLE"},
              {bg:"ascent", link:"classic", buttonText:"Play", text:"GUESS THE MAP"},
              {bg:"ascent", link:"classic", buttonText:"Play", text:"GUESS WITH EMOJI"} 
            ]}
        />
      </div>
    </div>
  )
}


