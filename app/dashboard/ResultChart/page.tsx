"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import chartData from "./sampleData"
import {getColourPalette} from "./colourPallete"
import {getColspans2} from "./colourPallete"



export default  function Page() {
    let colorPallete = getColourPalette();
    let colspans =  getColspans2();
    console.log("cols",colspans)
    useEffect(() => {
        //setIsClient(true)
      }, [])

    const sort_by_key = (jData) =>
    {
        for (let i = 0; i < jData.length - 1; i++) {
            for (let j = 0; j < jData.length - i - 1; j++) {
              if (jData[j].FinishTime > jData[j + 1].FinishTime) {
                let temp = jData[j];
                jData[j] = jData[j + 1];
                jData[j + 1] = temp;
              }
            }
          }
        return jData;
    }

    const renderSplit = (splits) =>{
        let rtnObj = [];
        for(let split in splits){
            let theNum = splits[split]["SplitNum"]
            console.log("Details", theNum,split)
            if (theNum>10){
                theNum =  10;
            }
            if(theNum < 1){
                theNum = 1;
            }
           // console.log("counter", split)
            const bgColor = String(colorPallete[split])
            
            theNum = (Math.round(theNum / 2))-1
           
            //const classname = colspans[theNum] + " " + bgColor +" rounded-md h-8"
            const classname = "background: blue; width: 100px;height: 100px;float: left;margin: 1em;"
            //console.log("daniel", classname)
            rtnObj.push(<div className="bar">{theNum}</div>)
            
           /*const classname = "col-span-20 bg-[#de3618] rounded-md h-8"
           console.log(classname)
            rtnObj.push(<div className={"col-span-"+ 4 +" bg-[#de3618] rounded-md h-8"} />)
            */
        }
        return rtnObj
    }
    const RenderAthletes= (chartData)=> {
        let amens = []
        console.log(chartData)
        chartData = sort_by_key(chartData)
        

        for(let idx in chartData){
            
            const splits = chartData[idx]["splits"]
            
            //if(splits.length>0){
            console.log(splits)
            let amen =  <div id="foo">
                        <div>{chartData[idx]["FirstName"] + " " + chartData[idx]["Surname"]}</div>
                            {
                                
                                    renderSplit(splits)
                                
                            }
                        </div>
            amens.push(amen)
                        //}
        }
        console.log(amens)
        return amens;
    }

    return (<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <Card>
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row"></CardHeader>
                <CardContent>
                    <CardTitle>Live Results</CardTitle>
                    <CardDescription>
                        Showing total visitors for the last 3 months
                    </CardDescription>
                    
                    
        

                </CardContent>
                </Card>
            </main>
    )
}
