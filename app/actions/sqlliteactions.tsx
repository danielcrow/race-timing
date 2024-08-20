"use server";

import { open, Database } from "sqlite";
import {Race} from "@/components/RaceListDB/columns"
import {Result} from "@/components/RaceSplits/columns"
import path from "path";
import sqlite3 from "sqlite3";
import Athlete from "@/components/manage/Athlete/Athlete";


function getSplitOrder(raceResults: AthleteObj[],splitNumber:number){
    let splitResults = []
    for(let r in raceResults){
        if (raceResults[r].splits[splitNumber-1]!=undefined){
            const bibNumber =raceResults[r].BibNumber
            //console.log("Daniel", raceResults[r].splits[splitNumber])
            const splitName = raceResults[r].splits[splitNumber-1].name
            const splitTime = raceResults[r].splits[splitNumber-1].time
            const actualSplitTime = raceResults[r].splits[splitNumber-1].ActualCumulativeTime
            const splitResult:splitResults = {"bibNumber": bibNumber, "splitName": splitName, "splitTime": splitTime,"ActualCumulativeTime": actualSplitTime}
            splitResults.push(splitResult)
        }else{
            console.log("Nothing")   
        }
    }
    splitResults = splitResults.sort((a, b) => {
        if (a.splitTime < b.splitTime) {
          return -1;
        }
      });
    

    for(let sr in splitResults){
        for (let r in raceResults){
            if(splitResults[sr].bibNumber == raceResults[r].BibNumber){
                let position:number = Number(sr)+1
                //console.log(position)

                //console.log(raceResults[r].splits[splitNumber-1])
                raceResults[r] = getSplitAverage(raceResults[r], raceResults,splitNumber)
                raceResults[r].splits[splitNumber-1].position = position;
                //console.log(raceResults[r].splits[splitNumber-1])
            }
        }
    }
    
    raceResults = getCumulativeSplitPosition(raceResults, splitResults,splitNumber)

    return raceResults;
}



function getCumulativeTime(athlete:AthleteObj){
   let cumulativeTime = 0
    for(let r in athlete.splits){
        cumulativeTime += athlete.splits[r].actualTime;
        athlete.splits[r].ActualCumulativeTime = cumulativeTime
    }

    return athlete;


}

function getCumulativeSplitPosition(athletes:AthleteObj[], splitResults:splitResults[],splitNumber:number){
    let rtnAthletes:AthleteObj[] = []

    splitResults = splitResults.sort((a, b) => {
        if (a.ActualCumulativeTime < b.ActualCumulativeTime) {
          return -1;
        }
      });
    

    for(let sr in splitResults){
        for (let r in athletes){
            if(splitResults[sr].bibNumber == athletes[r].BibNumber){
                let position:number = Number(sr)+1
                //athletes[r] = getSplitAverage(athletes[r], athletes,splitNumber)
                athletes[r].splits[splitNumber-1].CumumlativeSplitPosition = Number(sr) + 1;
            }
        }
    }



    return athletes;
    
}


function getSplitAverage(athlete:AthleteObj, raceResults: AthleteObj[],splitNumber:number): AthleteObj{
    let splitActuals = 0;
    let counter = 0;
    for (let r in raceResults){
        //console.log("Splits", splitNumber);
        if (raceResults[r].splits[splitNumber-1]!=undefined){
            //console.log("Acutla TIme", raceResults[r].splits[splitNumber-1].actualTime)
            splitActuals += raceResults[r].splits[splitNumber-1].actualTime;
        counter++
    }
    
    }
    //console.log(splitActuals)

    const avgTime = splitActuals / counter
    const dteSplitTm = new Date(avgTime);

    let AvgDateTime = dteSplitTm.getMinutes().toLocaleString().padStart(2, '0') + ":" + dteSplitTm.getSeconds().toLocaleString().padStart(2, '0')
    athlete.splits[splitNumber-1].AverageActualTime = avgTime;
    athlete.splits[splitNumber-1].AverageTime = AvgDateTime;
    


    return athlete
    
}


export async function getSplitDescriptions(raceid:string):Promise<string[]>{
    const sqlquery = "select * from SplitDescription sd  where RaceID ="+ raceid
    const dbPath = path.join(process.cwd(), "public/assets/RaceTiming.db");


    const db = await open({filename: dbPath, // Specify the database file path
        driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
    const raceLaps = await db.all(sqlquery);
    let labels = [];
    for(let r in raceLaps){
        labels.push(raceLaps[r].Description);
    }
    return labels;
}


export async function getRaceData(raceid:string, racestarttime:string): Promise<AthleteObj[]> {
    //const query:string =  "select * from splits where RaceID=" + raceid
    let raceDetailsQuery = "select BibNumber,Laps,StartDateTime,a.ChipStartDateTime from race left join athlete a on race.ID = a.RaceID  where Race.ID='"+raceid +"'"
    //console.log(raceDetailsQuery)
    let query:string = "select AthleteId,a.Notes Bib,a.FName ,a.LName ,at2.Description,splits.SplitDescription,r.StartDateTime , IIF(a.Sex==1,'Female','Male') Sex " 
        query =  query + ",a.DOB , SplitDateTime , PreviousSplitDateTime ,a.ChipStartDateTime "
        query =  query + "from Splits "
        query =  query + "left join athlete a on Splits.AthleteID = a.ID "
        query =  query + "left join AthleteTypes at2  on a.AthleteType  = at2.ID "
        query = query + "left join Race r on Splits.RaceId  = r.ID "
        query =  query + "where splits.raceid = '" + raceid + "' and athleteID NOTNULL   order by SplitDateTime"
    

    const dbPath = path.join(process.cwd(), "public/assets/RaceTiming.db");


    const db = await open({filename: dbPath, // Specify the database file path
        driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
    //Lets get the race details to process the splits
    let laps = 0;
    let ChipStartTime = new Date();
    let StartDateTime = new Date();

    const raceDetails = await db.all(raceDetailsQuery);

    if (raceDetails.length > 0){
        const raceDetail = raceDetails[0];
   
        laps = raceDetail["Laps"]
        ChipStartTime = raceDetail["ChipStartDateTime"]
      
        StartDateTime = raceDetail["StartDateTime"]
    }

    const races = await db.all(query);
    let raceResults: AthleteObj[] = []
    let dteSplitTm: Date =new Date();
    for(let race in races){
        
        let found = false;
        const splitDateTime = new Date(races[race].SplitDateTime)
        const prevSplitTime = new Date (races[race].PreviousSplitDateTime)
        //const ChipStartTime = new Date (races[race].chip)
        const splitTm = splitDateTime.getTime() - prevSplitTime.getTime();
        dteSplitTm = new Date(splitTm)
        let FinishTime = dteSplitTm.getMinutes().toLocaleString().padStart(2, '0') + ":" + dteSplitTm.getSeconds().toLocaleString().padStart(2, '0')
        let split:Splits = {
            name: races[race].SplitDescription, time: FinishTime, position: 0, actualTime: splitTm,
            AverageActualTime: 0,
            AverageTime: "",
            ActualCumulativeTime: 0,
            CumulativeTime: ""
        }
       
        for (let r in raceResults){
            if(raceResults[r].BibNumber == races[race].Bib){
                //console.log("Laps", raceResults[r].splits.length,laps )
                if (raceResults[r].splits.length==laps-1){
        
                    let RaceFinish:Date =new Date();
                        if(racestarttime!=""){
                            RaceFinish = new Date(StartDateTime)
                        }else{
                            RaceFinish = new Date(ChipStartTime)
                        }
                       // console.log("RaceFinish", RaceFinish)
                        //const splitDateTime:Date = new Date(raceResults[r].splits[laps-1]["time"]); 
                        const splitFinishTm = splitDateTime.getTime() - RaceFinish.getTime();
                        const dteSplitFinishTm = new Date(splitFinishTm)
                        let FinishTime = dteSplitFinishTm.getMinutes().toLocaleString().padStart(2, '0') + ":" + dteSplitFinishTm.getSeconds().toLocaleString().padStart(2, '0')
                        raceResults[r].FinishTime = FinishTime;
                        
                       //const FinishTime = raceResults[r].splits[laps-1]["time"]
                    }


                raceResults[r].splits.push(split)
                found = true;
            }
        }
        if(found!=true){
            let athlete:AthleteObj = {RaceId: raceid, BibNumber: races[race].Bib, ChipNumber: races[race].Bib,ChipStartTime: races[race].SplitDateTime,FirstName: races[race].FName, Surname: races[race].LName, FinishTime: "88888",splits: [split]}
            raceResults.push(athlete)
        }
       
    }
    
    let FinishTime = ""
    for(let r in raceResults){
        
        const raceResult = raceResults[r];
        //console.log(raceResult.splits.length,laps)
        if(raceResult.splits.length==1){
            FinishTime = raceResult.splits[0].time
            raceResults[r].FinishTime = FinishTime;
        }
        
        if(raceResult.splits.length<laps){

            FinishTime = "88888"
            raceResults[r].FinishTime = FinishTime;
        }
        if(raceResult.splits.length==0){
            FinishTime = "99999"
            raceResults[r].FinishTime = FinishTime;
        }

        raceResults[r] =  getCumulativeTime(raceResults[r])
    }
        
    for (let x=1; x<=laps;x++){
        raceResults = getSplitOrder(raceResults,x);
        //getSplitAverage(raceResults[0], raceResults,x)

    }

   // console.log(raceResults[0].splits)
    return raceResults

}


export async function getRaces(): Promise<Race[]> {
    let racesToReturn:Race[] = [];
    try{
        const query:string =  "select * from race"
        const dbPath = path.join(process.cwd(), "public/assets/RaceTiming.db");
        //console.log(dbPath)
        const db = await open({filename: dbPath, // Specify the database file path
        driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });

        const races = await db.all(query);
       
        for(let idx in races){
            const race = races[idx];
            if(race.FinishDateTime != null){
                let raceToAdd:Race = {RaceId: race.ID, RaceDescription: race.RaceName, StartDateTime: String(new Date(race.StartDateTime))}
                racesToReturn.push(raceToAdd);
            }
        }


        return racesToReturn
    } catch (e) {

    return []
    }
}