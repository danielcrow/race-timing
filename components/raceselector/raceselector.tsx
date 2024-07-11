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

export default function raceselector(props) {
  
    const [races, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [selectedOption, setSelectedOption] = useState(props.raceId)

    console.log("default", props.raceId)
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
        if (races[r].RaceId == race){
          props.race(races[r])
        }
      }

   
    }  
    const getRaceContent = (races: any) => {
        let content = [];
        for (let idx in races){
            if(races[idx].RaceId == props.raceId){
              content.push(<SelectItem value={races[idx].RaceId} key={races[idx].RaceId} selected>{races[idx].RaceDescription}</SelectItem>)

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