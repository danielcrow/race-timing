'use client'
import { useState, useEffect } from 'react'

export default function Page() {

  const [race, setRace] = useState("")
  
  const newRace = (race:any) =>{
    setRace(race);
  }

    return <div>
           
            Here we go
           
      </div>
  }