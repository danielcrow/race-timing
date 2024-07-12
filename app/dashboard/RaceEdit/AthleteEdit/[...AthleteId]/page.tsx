'use client'
import { useState, useEffect } from 'react'
import RaceSelector from '../../../components/RaceSelector/RaceSelector'
import Athletes from '../../../components/manage/Athletes/Athletes'
import Athlete from '../../../components/manage/Athlete/Athlete'
import { useParams } from 'next/navigation'

export default function Page() {

  const newRace = (race:any) =>{
    console.log(race)
    setRace(race.RaceId);

  }
  const params = useParams()
  
  const type =params.AthleteId[0]
  const id = params.AthleteId[1]
  
  const [race, setRace] = useState(id)
  const [athleteId, setAthleteId] = useState(id);
  //const [race, setRace] = useState("")
  
  
  /*useEffect(() => {
    setRace(id)
  },[])
*/
  console.log(params)
  if(type=="race"){

    return <div>
        
        <RaceSelector newRace={newRace} raceId="" />
        <div><Athletes race={race}></Athletes></div>
        </div>

  }else{
 
    return <div>
       
        <Athlete id={id}></Athlete>
        </div>

  }
  
}