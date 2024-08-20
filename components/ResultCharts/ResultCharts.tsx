"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { useState, useEffect } from 'react'
import {getRaceData, getSplitDescriptions} from "@/app/actions/sqlliteactions"

export default function ResultCharts(props: {raceId:string, athleteId:string }){
    const [data, setData] = useState({
        labels: ['Split 1', 'Split 2', 'Split 3', 'Split 4', 'Split 5'],
        datasets: [{
            label: 'Athlete 1',
            data: [65, 92, 12, 12, 56],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          }]});

    const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
        ssr: false,
      });




    useEffect(() => {
        const getJobs = async () => {
        console.log("hello World")
        const lapDescription:string[] = await getSplitDescriptions(props.raceId);
        


        const raceData =  await getRaceData(props.raceId,"asdas");
      
        let datasets = []
        for(let r in raceData){

            let splits = [];
            for(let s in raceData[r].splits){
                splits.push(raceData[r].splits[s].CumumlativeSplitPosition)
            }
            
            let dset = {label: raceData[r].FirstName + " " + raceData[r].Surname, data: splits, "fill": false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,stepped: false}
                /*
                let dset = {label: raceData[r].BibNumber, data: splits, "fill": false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,stepped: false}
    */
            datasets.push(dset);
           
        }
            console.log("dannny", props.athleteId)
            datasets = datasets.filter(function(item){
                return item.label == props.athleteId;         
            });
            

        let data = {"labels":lapDescription, "datasets": datasets}
            console.log(data)
        setData(data)
    }
    getJobs()
    },[])



  return (
    <div style={{ width: '700px', height: '700px' }}>
      <h1>Current Position</h1>
      <Line data={data} />
    </div>
  );


}

