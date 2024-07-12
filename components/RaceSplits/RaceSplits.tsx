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

  interface Props {
    race: string,
    raceDescription: string,
    startTime: string
   
  }

export default function RaceSplits(props:Props) {

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [raceid, setRaceId] = useState()

    
   

    useEffect(() => {
        console.log("Run it")
        console.log('/api/racedata?raceid=' + props.race +"&racestarttime=" +props.startTime)
       
        fetch('/api/racedata?raceid=' + props.race+"&racestarttime=" +props.startTime)
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setData(data)
            setLoading(false)
          })
      }, [props])


      const getRaceContent = (data: any) => {
        let content=  [];
   
        const firstColumn=data[0];
   
        for(let idx in data){
          
            content.push(<TableRow key={data[idx].BibNumber}>
                   {createSplits(data[idx])}
                </TableRow>)
        }
       
        return content
        }
        const createSplits = (splitData: any) =>{
            let splitContent = [];
            splitContent.push( <TableCell>{splitData.BibNumber}</TableCell>)
            splitContent.push(<TableCell>{splitData.ChipNumber}</TableCell>)
            splitContent.push(<TableCell>{splitData.FirstName}</TableCell>)
            splitContent.push(<TableCell>{splitData.Surname}</TableCell>)
            const splits = splitData.splits
                for( let idv in splits){
                  
                    if(splits[idv]!=undefined){
                        const key = Object.keys(splits[idv])
                        console.log("checking", splits[idv])
                        splitContent.push(<TableCell>{splits[idv]["time"]}</TableCell>)
                    }
                }
                return splitContent;
        }
      const extractColumnNames = ()=>
      {
        let content = []
        if(data.length>0){
            content.push(<TableHead className="w-[100px]">BibNumber</TableHead>)
            content.push(<TableHead className="w-[100px]">ChipNumber</TableHead>)
            content.push(<TableHead className="w-[100px]">FirstName</TableHead>)
            content.push(<TableHead className="w-[100px]">Surname</TableHead>)
            const firstRowSplits=data[0]["splits"];
          
            //const keys = Object.keys(firstRowSplits)
            
            for(let idx in firstRowSplits){
                content.push(<TableHead className="w-[100px]">{firstRowSplits[idx]["name"]}</TableHead>)
            }
        }
        return content;
    }
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No race data</p>
    return <div> Start Time {props.startTime}

        <Table>
            <TableHeader>
                <TableRow>{extractColumnNames()}</TableRow>
                </TableHeader>
                <TableBody>{getRaceContent(data)}</TableBody>
        </Table>
    </div>
        
  }