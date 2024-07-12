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
  import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';
  interface Props {
    race: String;
   
  }


export default function RaceAthletes({race}:Props) {

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [raceid, setRaceId] = useState("")

    useEffect(() => {
        console.log("Run it",race)
        setRaceId(String(race))
        //console.log('/api/getathletes?raceid=' + raceid
    
        fetch('/api/getathletes?raceid=' + raceid)
          .then((res) => res.json())
          .then((data) => {
            //console.log("My dad", data)
            setData(data)
            setLoading(false)
          })
      }, [race,raceid])
    
      const extractColumnNames = ()=>
      {
        let content = []
        //console.log(data)
        if(data.length>0){
            const firstColumn=data[0];
            const columns = Object.keys(firstColumn)
            for(let idx in columns){
                content.push(<TableHead className="w-[100px]" key={idx}>{columns[idx]}</TableHead>)
            }
        }
        return content;
    }

    const getRaceContent = (data: any) => {
        let content: React.ReactNode[]=  [];
        const firstColumn=data[0];
        for( let row in data){
          //console.log(data[row])
          const key = uuidv4();
          let rowContent:React.ReactNode[] = [];
          for(let idc in data[row]){
            rowContent.push( <TableCell key={uuidv4()}>{data[row][idc]}</TableCell>)
          }

          content.push(<TableRow key={key}>{rowContent}</TableRow>)
           
        }
        return content
    }
    extractColumnNames()
    return    <div>  <Table>
    <TableCaption>Race List</TableCaption>

    <TableHeader>
      <TableRow>
        {extractColumnNames()}
        </TableRow></TableHeader><TableBody>{getRaceContent(data)}</TableBody></Table></div>
  }