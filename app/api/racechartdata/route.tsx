export const dynamic = 'force-dynamic' // defaults to auto
import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "./../database"
import { NextRequest } from "next/server"

const DB =process.env.MONGODB
const collection: string  = "RaceSplits"
const athletes: string  = "Athletes"

const dummyData = [{"RaceId": 1,  "RaceDescription": "The Race", "SplitId": 3,  "BibNumber": 2,  "SplitTime": "12:00:01.001","AthleteID": 1 },{"RaceId": 1,  "RaceDescription": "The Race", "SplitId": 4,  "BibNumber": 2,  "SplitTime": "12:00:01.001","AthleteID": 1 }]



export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const raceid = searchParams.get('raceid')
        const racestarttime:any = searchParams.get('racestarttime')
        const RaceStartTime:Date = new Date(racestarttime)
        console.log(raceid)
        const db = (await clientPromise).db(DB);
        const query =  { "RaceID": Number(raceid)};


        const athletesCollection = db.collection(athletes);

        const racesplits = db.collection(collection);

       
        const allAthletes = await athletesCollection.find(query).toArray();
        let rtnObject:AthleteObj[] = []
        
        for(let ida in allAthletes){
            let athleteObj:AthleteObj = {"RaceId":"", "FirstName":"", "FinishTime":"","Surname":"","BibNumber":"","ChipNumber":"", "ChipStartTime":"","splits":[] };
            //const athlete:Athlete = allAthletes[ida]
            athleteObj["RaceId"] = allAthletes[ida]["RaceID"]
            athleteObj["FirstName"] = allAthletes[ida]["FName"]
            athleteObj["Surname"] = allAthletes[ida]["LName"]
            athleteObj['BibNumber'] = allAthletes[ida]["Notes"]
            athleteObj['ChipNumber'] = allAthletes[ida]["BibNumber"]
            if( allAthletes[ida]["ChipStartDateTime"]== null){
                athleteObj['ChipStartTime'] ="N/A"
            }else{
                athleteObj['ChipStartTime'] =allAthletes[ida]["ChipStartDateTime"]
            }
            athleteObj["splits"] = []
            rtnObject.push(athleteObj)
        }


        //let rtnObject = []

        const allRaces = await racesplits.find(query).sort({SplitDateTime: 1}).toArray();
    
        for(let idx in allRaces){
            for(let x in rtnObject){
                const BibNumber = allRaces[idx].BibNumber  
                if(BibNumber==rtnObject[x]["ChipNumber"]){
                    const splitDateTime = new Date(allRaces[idx].SplitDateTime)
                    const splitTm  = splitDateTime
                    const dteSplitTm = new Date(splitDateTime)
                    //const dteSplitTmNum = new Date(splitDateTime).getTime()
                    const prevSplitTime = new Date (allRaces[idx].PreviousSplitDateTime)
                   // console.log("PrevTime", prevSplitTime)
                    const dteSplitTmNum = Math.round(((splitDateTime.getTime() - prevSplitTime.getTime()) /60)/1000);
                    const desc = allRaces[idx].SplitDescription
                    const chartResultObj = {"BibNumber": BibNumber, "SplitTime": dteSplitTm, "SplitDesc": desc, "SplitNum": dteSplitTmNum}
                    
                    rtnObject[x]["splits"].push(chartResultObj)
                    let FinishTime = "";x
                    
                    if(allRaces[idx].SplitDescription=="Finish"){
                        FinishTime = dteSplitTm.getMinutes().toLocaleString().padStart(2, '0') + ":" + dteSplitTm.getSeconds().toLocaleString().padStart(2, '0')
                    }
                    else{
                        FinishTime = "88888";
                    }
                    rtnObject[x]["FinishTime"] = FinishTime;
                }
            }

   
        
                
            
        }
        for(let idx in rtnObject){
            
            if(rtnObject[idx]["FinishTime"]==''){
                console.log("Found one", rtnObject[idx]["FinishTime"]);
                rtnObject[idx]["FinishTime"]="99999";
            }
        }
       
        const val = JSON.stringify(rtnObject)

        const obj = JSON.parse(val);
        (await clientPromise).close
        return Response.json(obj)
    } catch (e) {

        (await clientPromise).close
       return new Response("Err")
    }
}
/*
function millisToMinutesAndSeconds(millis:number) {
    let minutes:Number = Math.floor(millis / 60000);
    let seconds:string = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }
*/
export async function POST() {
    try {
      
        const db = (await clientPromise).db(DB)
        const theCollection = await db.collection(collection)
        console.log(DB)
        console.log(collection)
        
        const submittedDocument = await theCollection.insertMany(dummyData)
        console.log(submittedDocument);
        (await clientPromise).close

        return Response.json("{Results: []}")
    } catch (e) {
        console.log(e)
       return new Response("Error")
    }
}