'use client'
import { useState, useEffect } from 'react'
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

  import Link from 'next/link';
import { table } from 'console';


export default function Athletes(props: { race: string }){
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [raceid, setRaceId] = useState()

    

    const onClick = (athlete: any) =>{

        console.log(athlete)
    }
   
   useEffect(() => {
   
    fetch('/api/athlete?raceid=' + props.race)
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            setLoading(false)
          })
      }, [props.race])

    const getAthleteContent = (data: any) => {
        let tableContent = []
        for(let idx in data){
            const athlete = data[idx]
            
            tableContent.push( <TableRow key={athlete.ID}>
                <TableCell ><Link href={`/dashboard/RaceEdit/AthleteEdit/athlete/${athlete.ID}`} >{athlete.Notes}</Link></TableCell>
                <TableCell>{athlete.BibNumber}</TableCell>
                <TableCell >{athlete.FName}</TableCell>
                <TableCell>{athlete.LName}</TableCell>
            
            </TableRow>);
       }
       return tableContent;
    }
      return    <div>

        <Table>
            <TableCaption>Athletes</TableCaption>

            <TableHeader>
            <TableRow><TableHead className="w-[100px]">Chip Number</TableHead>
            <TableHead className="w-[100px]">Bib Number</TableHead>
            <TableHead className="w-[100px]">First Name</TableHead>
            <TableHead className="w-[100px]">Surname</TableHead></TableRow>
            </TableHeader>
            <TableBody>{getAthleteContent(data)}</TableBody>
        </Table>

      </div>
}