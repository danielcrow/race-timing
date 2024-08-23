"use server";

import { open, Database } from "sqlite";
import {Race} from "@/components/RaceListDB/columns"
import {Result} from "@/components/RaceSplits/columns"
import path from "path";
import sqlite3 from "sqlite3";



export async function getRaceType(){
    const sqlquery = "select RaceShortName, RaceId, RaceDescritption from Race";
    const dbPath = path.join(process.cwd(), "public/assets/RaceTiming.db");
    let rtnTypes: any[] = [];

    const db = await open({filename: dbPath, // Specify the database file path
        driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
        
    });
    const races = await db.all(sqlquery);

    for (let race in races){
        const raceDetails = races[race];
        const rSName = raceDetails["RaceShortName"];

        if(rSName.includes("AQ")){
            console.log("e")
        }
    }

    return rtnTypes
}

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
    const sqlquery = "select * from SplitDescription sd  where RaceID ="+ raceid + " order by OrderID"
    const dbPath = path.join(process.cwd(), "public/assets/RaceTiming.db");


    const db = await open({filename: dbPath, // Specify the database file path
        driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
    const raceLaps = await db.all(sqlquery);
    let labels = [];
    for(let r in raceLaps){
        labels.push(raceLaps[r].Description);
    }

    //console.log("D",labels)
    return labels;
}


function lastSunday(month: number, year: any) {
    var d = new Date();
    var lastDayOfMonth = new Date(Date.UTC(year || d.getFullYear(), month+1, 0));
    var day = lastDayOfMonth.getDay();
    return new Date(Date.UTC(lastDayOfMonth.getFullYear(), lastDayOfMonth.getMonth(), lastDayOfMonth.getDate() - day));
  }
  
  function isBST(date: Date) {
    var d = date || new Date();
    var starts = lastSunday(2, d.getFullYear());
    starts.setHours(1);
    var ends = lastSunday(9, d.getFullYear());
    ends.setHours(1);
    return d.getTime() >= starts.getTime() && d.getTime() < ends.getTime();
  }

function fixDate(date: Date){
    date.setTime(date.getTime() - date.getTimezoneOffset()*60*1000)
    return date
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
   
      
        StartDateTime = raceDetail["StartDateTime"]
    }
 
    const races = await db.all(query);
    let raceResults: AthleteObj[] = []
    let dteSplitTm: Date =new Date();
    for(let race in races){
        
        let found = false;
        let splitDateTime = new Date(races[race].SplitDateTime )
        splitDateTime = fixDate(splitDateTime)
        let prevSplitTime = new Date (races[race].PreviousSplitDateTime )
        prevSplitTime = fixDate(prevSplitTime)
        //const ChipStartTime = new Date (races[race].chip)
        const splitTm = splitDateTime.getTime() - prevSplitTime.getTime();
        dteSplitTm = new Date(splitTm )
        let FinishTime = dteSplitTm.getMinutes().toString().padStart(2, '0') + ":" + dteSplitTm.getSeconds().toLocaleString().padStart(2, '0')
        let split:Splits = {
            name: races[race].SplitDescription, time: FinishTime, position: 0, actualTime: splitTm,
            AverageActualTime: 0,
            AverageTime: "",
            ActualCumulativeTime: splitTm,
            CumulativeTime: "",
            CumumlativeSplitPosition: 0
        }
       
        for (let r in raceResults){
            if(raceResults[r].BibNumber == races[race].Bib){
                //console.log("Laps", raceResults[r].splits.length,laps )
                if (raceResults[r].splits.length==laps-1){
        
                    let RaceFinish:Date =new Date();
                    ChipStartTime = new Date(races[r].ChipStartDateTime)
                    console.log("Check CDT", races[r].ChipStartDateTime)
                        if(races[r].ChipStartDateTime== null){
                
                            RaceFinish = new Date(StartDateTime )
                            RaceFinish = fixDate(RaceFinish)
                        }else{
                            RaceFinish = new Date(ChipStartTime )
                            RaceFinish = fixDate(RaceFinish)
                        }
                        if(isBST(RaceFinish)){
                            
                            //RaceFinish.setHours(RaceFinish.getUTCHours() + 1);
                        }
                        //console.log("RaceFinish before calcs" , RaceFinish, racestarttime, ChipStartTime)
                       // console.log("RaceFinish", RaceFinish)
                        //const splitDateTime:Date = new Date(raceResults[r].splits[laps-1]["time"]); 
                        const splitFinishTm = splitDateTime.getTime() - RaceFinish.getTime();
                        console.log(raceResults[r].Surname, splitDateTime,RaceFinish)
                        const dteSplitFinishTm = new Date(splitFinishTm)
                            console.log("time",splitFinishTm)
                        let FinishTimeActual =splitFinishTm;
                        
                        let FinishTime = dteSplitFinishTm.getUTCHours().toString().padStart(2, '0') + ":" + dteSplitFinishTm.getMinutes().toLocaleString().padStart(2, '0') + ":" + dteSplitFinishTm.getSeconds().toLocaleString().padStart(2, '0')
                        raceResults[r].FinishTime = FinishTime;
                        raceResults[r].FinishTimeActual = FinishTimeActual;
                        //console.log("RaceFinish" , RaceFinish, racestarttime, ChipStartTime, FinishTime, splitDateTime,splitFinishTm)
                       //const FinishTime = raceResults[r].splits[laps-1]["time"]
                    }


                raceResults[r].splits.push(split)
                found = true;
            }
        }
        if(found!=true){
            let athlete:AthleteObj = {
                RaceId: raceid, BibNumber: races[race].Bib, ChipNumber: races[race].Bib, ChipStartTime: races[race].SplitDateTime, FirstName: races[race].FName, Surname: races[race].LName, FinishTime: "88888", splits: [split],
                FinishTimeActual: 0
            }
            raceResults.push(athlete)
        }
       
    }
    
    let FinishTime = ""
    for(let r in raceResults){
        
        const raceResult = raceResults[r];
        //console.log(raceResult.splits.length,laps)
        //console.log("Checlk for laps",raceResult.splits.length)
        if(raceResult.splits.length==1){
            
            FinishTime = raceResult.splits[0].time
            //console.log("Testing", FinishTime)
            raceResults[r].FinishTime = FinishTime;
            //console.log("testing cum time",raceResult.splits[0].ActualCumulativeTime)
            raceResults[r].FinishTimeActual =  Number(raceResult.splits[0].ActualCumulativeTime);
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
   //console.log(raceResults)
    return raceResults

}

export async function GetAwards(raceid:string): Promise<any[]> {
    let sql = "select dr.DivisionID,dr.RaceID,at2.Description atDescription,r.StartDateTime, dr.FinishTime,a.ChipStartDateTime , dr.IsHighestDivision,d.Description,a.AthleteType  ,a.FName,a.LName ,dr.OverallPlace, dr.Place  "
    sql += "from DivisionResults dr "
    sql+= "left join Athlete a  on dr.AthleteID  = a.ID "
    sql += "left join Divisions d on d.ID =dr.DivisionID "
    sql += "left join AthleteTypes at2 on at2.ID = a.AthleteType "
    sql += "left join Race r on r.ID =dr.RaceID "
    sql+= "where dr.RaceID =" + raceid
    try{
        const query:string =  "select * from race"
        const dbPath = path.join(process.cwd(), "public/assets/RaceTiming.db");
        //console.log(dbPath)
        const db = await open({filename: dbPath, // Specify the database file path
        driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });

        const races = await db.all(sql);
        
        return races;
    }catch (e) {
        return []
    }
    
}


export async function getRaces(): Promise<race[]> {
    let racesToReturn:race[] = [];
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
                let raceToAdd:race = {
                    RaceId: race.ID, RaceDescription: race.RaceName, StartDateTime: String(new Date(race.StartDateTime)),
                    RaceShortName: race.RaceShortName
                }
                racesToReturn.push(raceToAdd);
            }
        }


        return racesToReturn
    } catch (e) {

    return []
    }
}