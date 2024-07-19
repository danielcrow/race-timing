'use client'
import { useState, useEffect } from 'react'
import { useFormStatus, useFormState } from 'react-dom'
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
  import { Input } from '@/components/ui/input';
  import { Button } from '@/components/ui/button';
  import { Card, CardContent, CardHeader, CardTitle,CardDescription } from '@/components/ui/card'
  

  import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from "lucide-react"
  import { Label } from "@/components/ui/label"
  import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  import { useRouter } from 'next/router'
  import Athlete from '@/components/manage/Athlete/Athlete'
  import Link from 'next/link';
import { table } from 'console';


import EditRace from '@/components/manage/EditRace'
import NewAthlete from '@/components/manage/NewAthlete'


interface race {
  RaceId: string;
  StartDateTime: string;
  RaceDescription: string;

}

export default function Athletes(props: { race: string, raceObj:race }){
    console.log("Atheltes", props.raceObj)
    const [athleteData, setAthleteData] = useState({"RaceID": "", "Notes":"", "FName":"","LName":"","BibNumber":""})
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [raceid, setRaceId] = useState()
    //const initialState:AthleteState = { message: null, errors: {} };

    const onClick = (athlete: any) =>{
        console.log(athlete)
    }
    
    const doRefresh = () =>{
      console.log("Called it")
      setData(data);
    }
    
   useEffect(() => {
   
    fetch('/api/athlete?raceid=' + props.race)
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            setLoading(false)
          })
      }, [props.race, props.raceObj])

    const getAthleteContent = (data: any) => {
        let tableContent = []
        for(let idx in data){
            const athlete = data[idx]
            tableContent.push(<Athlete  athlete={athlete} raceObj={props.raceObj}></Athlete>);
       }
    
       return tableContent;
    }
  return  <div>
         
            <EditRace race={props.raceObj}></EditRace>
            <NewAthlete race={props.raceObj}></NewAthlete>
        
            <div className="relative w-full overflow-auto">
              <Table>
                <TableCaption>Athletes</TableCaption>

                <TableHeader>
                <TableRow><TableHead className="w-[100px]">Chip Number</TableHead>
                <TableHead className="w-[100px]">Bib Number</TableHead>
                <TableHead className="w-[100px]">First Name</TableHead>
                <TableHead className="w-[100px]">Surname</TableHead></TableRow>
                </TableHeader>
             
                <TableBody >{getAthleteContent(data)}</TableBody>
              
              </Table>
            </div>
          
   
      
      </div>
}

