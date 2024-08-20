'use client'
import { useState, useEffect } from 'react'
import RaceSelector from '@/components/RaceSelector/RaceSelector'
import Athletes from '@/components/manage/Athletes/Athletes'
import Athlete from '@/components/manage/Athlete/Athlete'
import NewRace from '@/components/manage/NewRace'

import RaceSetup from '@/components/racesetup/RaceSetup'
import { Label } from "@/components/ui/label"
import { useParams } from 'next/navigation'
import { Button} from '@/components/ui/button'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import RaceList from '@/components/manage/RaceListDB'
import { Card, CardContent, CardHeader,CardFooter, CardTitle,CardDescription } from '@/components/ui/card'
import {deleteRace} from '@/app/actions/actions'

export default function Page() {
  const router = useRouter()
 
  const newRace = (race:any) =>{
    setRaceObj(race)
    setRace(race.RaceId);
    setType("race")
   
    console.log("New Race", race)

   
  }

  const newRaceboard = (race:any) =>{
    setRaceObj(race)
    setRace(race.RaceId);
    //setType("race")
   
    console.log("New Race", race)

   
  }

  //Collect route params
  const params = useParams()
  const type =params.AthleteId[0]
  const id = params.AthleteId[1]
  console.log(params)
  //Setup state
  const [race, setRace] = useState(id)
  const [athleteId, setAthleteId] = useState(id);
  const [raceObj, setRaceObj] = useState({RaceId:"", StartDateTime:"", RaceDescription:""})
  const[theType,setType] = useState(type)

  const handleClick = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    console.log(e)
    switch(e.target.id){
      case 'race':
        router.push('/admindashboard/'+e.target.id, { scroll: false })
        break;
        
        
    }
  }
  useEffect(() => {
      console.log("Hello")
  },[raceObj])

  const onRtnClick = (e: any) =>{
    //raceObj = {}
    //newRace({})
    //raceObj.RaceId = "1"
    setType("chooserace")
  }
  const onDeleteClick = async (e: any) =>{
    //raceObj = {}
    //newRace({})
    //raceObj.RaceId = "1"
    console.log(raceObj.RaceId)
    await deleteRace(raceObj.RaceId);
    setType("chooserace")
  }



  
const loadUx = (type:string) => {
  switch(theType) {
    case 'race':
      if(raceObj.RaceId!=""){
      return <div>
                <div>    
                  <div>
                  <Card>
                      <CardHeader>
                        <CardTitle>{raceObj.RaceDescription}</CardTitle>
                        <CardDescription>Please edit your athletes here.
                        <Button  variant="outline" onClick={onRtnClick}>Finished Editing</Button>
                        <Button  variant="outline" onClick={onDeleteClick}>Delete Race</Button>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                      
                        <Athletes race={race} raceObj={raceObj}></Athletes>
                        
                      </CardContent>
                  </Card>
              </div>
        </div>
      </div>
      }
      break;
      case 'chooserace':
          return  <div className="flex items-center">
           <div>
              <Card>
                <CardHeader>
                  <CardTitle>Your Races</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                      <RaceList newRace={newRace} raceId="" />
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <NewRace></NewRace>
               
                </CardFooter>
              </Card>
                 </div>
           </div>
      
      break;

  
    case 'racesetup':
      
      return <RaceSetup></RaceSetup>
      break;
  }
}
return <div> 
   {loadUx(type)}
  
  </div>

  
}