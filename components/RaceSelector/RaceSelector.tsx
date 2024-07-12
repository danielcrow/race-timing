'use client'
import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface Props {
  newRace: (race:string)=>void,
  raceId: string
 
}
//Type for races
interface Races {
  _id: string,
  RaceId: number,
  RaceDescription: string,
  StartDateTime: Date
 
}
export default function RaceSelector({newRace = () => {}, raceId}:Props) {
  
    const [races, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [selectedOption, setSelectedOption] = useState(raceId)

    console.log("default", raceId)
    useEffect(() => {
        fetch('/api/races')
          .then((res) => res.json())
          .then((races) => {
            setData(races)
            setLoading(false)
          })
      }, [])


    const onChange = (race: any) =>{
      setSelectedOption(race.RaceId)

      for(let r in races){
        console.log("in the races", races[r])
       const raceChoice:Races = races[r]
        if (raceChoice.RaceId == race){
          console.log(races[r])
          newRace(races[r])
        }
      }

   
    }  
    const getRaceContent = (races: any) => {
        let content = [];
        for (let idx in races){
            if(races[idx].RaceId == raceId){
              content.push(<SelectItem value={races[idx].RaceId} key={races[idx].RaceId}>{races[idx].RaceDescription}</SelectItem>)

            }else{
                content.push(<SelectItem value={races[idx].RaceId} key={races[idx].RaceId}>{races[idx].RaceDescription}</SelectItem>)
               //content.push({"value": data[idx], "label": data[idx]})
          }
              }
        return content
    }

    if (isLoading) return <p>Loading...</p>
    if (!races) return <p>No race data</p>
    return <div>
      <Select onValueChange={onChange} value={selectedOption}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Race" />
        </SelectTrigger>
        <SelectContent>
        <SelectGroup>
      <SelectLabel>Races</SelectLabel>
        {getRaceContent(races)}
        </SelectGroup>
      </SelectContent>
      </Select></div>
  }