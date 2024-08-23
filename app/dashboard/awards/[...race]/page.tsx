import { GetAwards } from "@/app/actions/sqlliteactions"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle,CardDescription } from '@/components/ui/card'

import {  ReactNode, ReactPortal,  } from "react";
import { CreditCard } from "lucide-react";

export default async function Page(pageParams:PageProps) {
    //console.log("Dan",pageParams.params.race)
    const awards = await GetAwards(pageParams.params.race)
 
    const groupBy = (key: string | number) => (array: any[]) =>
        array.reduce((objectsByKeyValue: { [x: string]: any; }, obj: { [x: string]: any; }) => {
          const value = obj[key];
          objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
          return objectsByKeyValue;
        }, {});

        const groupByDiv = groupBy('Description');

    function loadRacer(racerAward: any){
        let rtnValue = [];
        
        for(let racer in racerAward){
            let row = <TableRow>
                        <TableCell>{racerAward[racer].Place} </TableCell>
                        <TableCell>{racerAward[racer].OverallPlace} </TableCell>
                        <TableCell>{racerAward[racer].FName} {racerAward[racer].LName}</TableCell>
                        <TableCell>{racerAward[racer].atDescription} </TableCell>
                        <TableCell>{racerAward[racer].FinishTime} </TableCell>
                    </TableRow>
            rtnValue.push(row)
        }
        return rtnValue;
    }
    function loadIt(awardsToGive:any ){
        let rtnValue: any[] = []
        for (const key in awardsToGive) {  
            let award=  <div >
  
            <main>
            
            <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {key}
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <Table><TableHeader><TableRow>
                <TableCell>Place</TableCell>
                <TableCell>Overall Place</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Athlete Type</TableCell>
                <TableCell>Finish Time</TableCell>
                
                </TableRow></TableHeader><TableBody>
             {loadRacer(awardsToGive[key])}
            </TableBody></Table>
            </CardContent>
          </Card>
          </main>
          </div>
           
            rtnValue.push(award)
        
          }
       
        return rtnValue;
    }

    let awardsToGive = groupByDiv(awards)


    return (<div>{loadIt(awardsToGive)}
            </div>
    
        )
    }