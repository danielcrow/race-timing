'use client'
import { useState, useEffect } from 'react'
import RaceDbUploader from  '@/components/racedatabase/racedbuploader/racedbuploader'
import { Card, CardContent, CardHeader, CardTitle,CardDescription } from '@/components/ui/card'
import { Button} from '@/components/ui/button'
import Link from "next/link"
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

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import RaceDBSelector from '@/components/racedatabase/RaceDBSelector/RaceDBSelector'
import RaceAthletes from '@/components/RaceAthletes/RaceAthletes'
interface IProps_Square {
  message: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export default function Page() {

  const [race, setRace] = useState("")
  const [dbStatus, setDBStatus] = useState(false) 



  const setLiveDBStatus = (status:boolean) =>{
    setDBStatus(status);
    console.log(status)
  }

  const SetLiveRace = (race:string) =>{
    console.log("My Race", race)
    setRace(race);
    
  }

  const isRaceLoaded = (race:string) =>{

  }

  const processAtheletes = () =>{
    console.log("Processing", race)
    fetch('/api/preparerace?raceid='+race, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then(data => console.log(data));

  }
  
const processSplits= () =>{
  console.log("Processing splits", race)
  fetch('/api/processsplits?raceid='+race, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(response => response.json())
    .then(data => console.log(data));
}

  const statusRender = ()=> {
    if(dbStatus){
      return <p>Loaded</p>
    }else{
      return <p>Not Loaded</p>
    }
  }

    return <div>
 <div className="flex min-h-screen w-full flex-col">
  
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upload Database
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <RaceDbUploader dbstatus={setLiveDBStatus}></RaceDbUploader>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Database Uploaded
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  statusRender()
            }</div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Choose Race</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>

               <RaceDBSelector race={SetLiveRace}/>
     
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Race ID</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{race}</div>
             
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card
            className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Race Athletes</CardTitle>
                <CardDescription>
                 Athletes Competing in Race 
                </CardDescription>
              </div>
             
            </CardHeader>
            <CardContent>
           <RaceAthletes race={race}></RaceAthletes>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>Divisions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
              <Button onClick={() => processAtheletes()} className="my-custom-class" >Process Athletes</Button>
              <Button onClick={() => processSplits()} className="my-custom-class" >Process Splits</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    </div>
  }