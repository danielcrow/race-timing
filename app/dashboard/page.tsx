'use client'
import { useState, useEffect } from 'react'
import RaceSelector from '@/components/raceselector/raceselector'
import RaceSplits from '@/components/racesplits/racesplits'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
export default function Page() {

  const [race, setRace] = useState("")
  
  const newRace = (race:any) =>{
    setRace(race);
  }

    return <div>
           
            Here we go
           
      </div>
  }