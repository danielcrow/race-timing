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

export default function RaceDBSelector(props) {
  
    const [races, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        fetch('/api/getracesfromdb')
          .then((res) => res.json())
          .then((races) => {
            setData(races)
            setLoading(false)
          })
      }, [])


    const onChange = (race: any) =>{
        console.log(race)
      props.race(race);
   
    }  
    const getRaceContent = (races: any) => {
        let content = [];
        for (let idx in races){
                content.push(<SelectItem value={races[idx].ID}>{races[idx].RaceName}</SelectItem>)
               //content.push({"value": data[idx], "label": data[idx]})
        }
        return content
    }

    if (isLoading) return <p>Loading...</p>
    if (!races) return <p>No race data</p>
    return <div>
      <Select onValueChange={onChange}>
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