'use client'
import RaceSelector from '@/components/raceselector/raceselector'
import Athletes from '@/components/manage/athletes/athletes'
import { useState, useEffect } from 'react'

export default function Page() {


  const [race, setRace] = useState({})
  
  const newRace = (race:any) =>{

    setRace(race);

  }
    return <div>
          <div>
              <RaceSelector race={newRace} />
             <div><Athletes race={race}></Athletes></div>
            </div>
 </div>
}