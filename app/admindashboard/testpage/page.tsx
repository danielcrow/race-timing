'use client'
import {getRaceData} from '@/app/actions/sqlliteactions'

import {Race} from "@/components/RaceList/columns"
import RaceListDB from '@/components/RaceListDB/RaceListDB'
import { useState, useEffect } from 'react'

export default function Page() {
    const [races, setRaces] = useState([]);

    useEffect(() => {
        const updateRaces = async () => {
          const d:Race[] = await getRaceData("74","");
          console.log(d)
          setRaces(d);
          
        };
        updateRaces();
        console.log(races);
      }, []);



    const loadRaces = (races: any) => {
        let raceTable = []
        for(let race in races){
            const row = <div><div>{races[race].RaceId}</div><div>{races[race].StartDateTime}</div></div>
            
            raceTable.push(row);
        }
        return raceTable
    }


    return <div> 
           
       {loadRaces(races)}
        </div>
}


