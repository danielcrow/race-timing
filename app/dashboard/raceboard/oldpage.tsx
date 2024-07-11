'use client'
import { useState, useEffect } from 'react'
import RaceSelector from '@/components/raceselector/raceselector'
import RaceSplits from '@/components/racesplits/racesplits'
import { Button } from '@/components/ui/button'
export default function Page() {

  const [race, setRace] = useState({})
  
  const newRace = (race:any) =>{
    console.log(race)
    setRace(race);

  }

    return <div>

            
            <div>
              <RaceSelector race={newRace} />
            </div>
          <div>
              <RaceSplits key={race.RaceId} race={race.RaceId} startTime={race.StartDateTime} raceDescription={race.RaceDescription}  />
          </div>
      </div>
  }