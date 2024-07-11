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

export default function raceselector(props) {

    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [raceid, setRaceId] = useState()

    useEffect(() => {
        console.log("Run it")
        let raceid = props.race
        console.log('/api/getathletes?raceid=' + raceid)
        
        if(raceid!=""){
            raceid = "1"
        }   
        setRaceId(raceid)

        fetch('/api/getathletes?raceid=' + raceid)
          .then((res) => res.json())
          .then((data) => {
            console.log("My dad", data)
            setData(data)
            setLoading(false)
          })
      }, [raceid])

      const extractColumnNames = ()=>
      {
        let content = []
        console.log(data)
        if(data.length>0){
            const firstColumn=data[0];
            const columns = Object.keys(firstColumn)
            for(let idx in columns){
                content.push(<TableHead className="w-[100px]">{columns[idx]}</TableHead>)
            }
        }
        return content;
    }

    const getRaceContent = (data: any) => {
        let content=  [];
        const firstColumn=data[0];
        //const columns = Object.keys(firstColumn)
        
        content = data.map((row: { [s: string]: unknown } | ArrayLike<unknown>) => (
            <TableRow>
                {Object.values(row).map(rowValue => 
                    <TableCell>{rowValue}</TableCell>
                )}
            </TableRow>
        ))

       // for (let idx in data){
           // let row = <TableRow className='text-center capitalize' key={data[idx].AthleteID}></TableRow>
            //let row = TableRow
            
              //      for(let idv in columns){
                //        row.     
                //          }
               //content.push({"value": data[idx], "label": data[idx]})
        //}
        return content
    }
    extractColumnNames()
    return    <div>  <p>{raceid}</p> <Table>
         <TableCaption>Race List</TableCaption>

         <TableHeader><TableRow>{extractColumnNames()}</TableRow></TableHeader><TableBody>{getRaceContent(data)}</TableBody></Table></div>
  }