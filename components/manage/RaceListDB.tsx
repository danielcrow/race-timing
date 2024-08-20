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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getRaces } from '@/app/actions/sqlliteactions'

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
export default function RaceList({newRace = () => {}, raceId}:Props) {
  
    const [races, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [selectedOption, setSelectedOption] = useState(raceId)

    console.log("default", raceId)
    /*
    useEffect(() => {
        fetch('/api/races')
          .then((res) => res.json())
          .then((races) => {
            setData(races)
            setLoading(false)
          })
      }, [])
      */
      useEffect(() => {
        const updateRaces = async () => {
          const d = await getRaces();
          console.log(d)
          setData(d);
          setLoading(false)
          
        };
        updateRaces();
        console.log(races);
      }, []);



    
    const getRaceContent = (races: any) => {
        let content = [];
        for (let idx in races){
          content.push(<TableRow key={races[idx].RaceId} onClick={() => newRace(races[idx])}  >
            <TableCell>{races[idx].RaceId}</TableCell>
            <TableCell>{races[idx].RaceDescription}</TableCell>
            <TableCell>{races[idx].StartDateTime}</TableCell>
            <TableCell>Finish</TableCell>
        </TableRow>)
            
              }
        return content
    }

    if (isLoading) return <p>Loading...</p>
    if (!races) return <p>No race data</p>
    return <div>
        <Table>
        <TableHeader>
                <TableRow><TableHead className="w-[100px]">RaceId</TableHead>
                <TableHead className="w-[100px]">Race Description</TableHead>
                <TableHead className="w-[100px]">Race Start Time</TableHead>
                <TableHead className="w-[100px]">Race Finish Split</TableHead></TableRow>
                </TableHeader>
                {getRaceContent(races)}
        </Table>
      </div>

      
  }