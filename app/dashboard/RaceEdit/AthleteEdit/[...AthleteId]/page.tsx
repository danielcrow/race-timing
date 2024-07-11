'use client'
import RaceSelector from '@/components/raceselector/raceselector'
import Athletes from '@/components/manage/athletes/athletes'
import { useState, useEffect } from 'react'
import Athlete from '@/components/manage/athletes/athlete'
import { useParams } from 'next/navigation'

export default function Page() {

  const newRace = (race:any) =>{
    console.log(race)
    setRace(race.RaceId);

  }

  const [athleteId, setAthleteId] = useState({});
  const [race, setRace] = useState("")
  const params = useParams()
  
  const type =params.AthleteId[0]
  const id = params.AthleteId[1]

  useEffect(() => {
    setRace(id)
  }, [])

  console.log(params)
  if(type=="race"){
    return <div>
        <RaceSelector race={newRace} />
        <div><Athletes race={race}></Athletes></div>
        </div>

  }else{
    return <div>
        <Athlete id={id}></Athlete>
        </div>

  }
  
}