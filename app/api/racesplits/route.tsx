export const dynamic = 'force-dynamic' // defaults to auto
import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "./../database"
import { NextRequest } from "next/server"

const DB =process.env.MONGODB
const collection: string  = "RaceSplits"

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

        const racesplits = db.collection(collection);
        const allRaces = await racesplits.find(query).sort({SplitDateTime: 1}).toArray();
        console.log(query);
        let racersSplits: any[] = []



        for(let idx in allRaces){
            const BibNumber = allRaces[idx].BibNumber  
           
            if(racersSplits.length != 0){
                let bibfound=false;
                for(let idv in racersSplits){
                    if(racersSplits[idv].BibNumber == allRaces[idx].BibNumber){
                        console.log(allRaces[idx].PreviousSplitDateTime)
                        const splitDateTime = new Date(allRaces[idx].SplitDateTime)
                        const prevSplitTime = new Date (allRaces[idx].PreviousSplitDateTime)
                        const splitTm = splitDateTime.getTime() - RaceStartTime.getTime();
                        const dteSplitTm = new Date(splitTm)
                        

                        racersSplits[idv][allRaces[idx].SplitDescription] = dteSplitTm.getMinutes().toLocaleString().padStart(2, '0') + ":" + dteSplitTm.getSeconds().toLocaleString().padStart(2, '0')
                        + ":" + dteSplitTm.getMilliseconds().toLocaleString().padStart(2, '0');
                        bibfound=true;
                    }
                }
                if (bibfound==false){
                    console.log("adding the split",allRaces[idx].BibNumber)
                        const splitidv =  "Split" + allRaces[idx].SplitId
                        const data:any =  {"RaceId": allRaces[idx].RaceID,  "RaceDescription":allRaces[idx].RaceDescription,   "BibNumber": allRaces[idx].BibNumber}
                        const splitDateTime = new Date(allRaces[idx].SplitDateTime)
                        const splitTm = splitDateTime.getTime() - RaceStartTime.getTime();
                        const dteSplitTm = new Date(splitTm)
                       
                       
                        data[allRaces[idx].SplitDescription] = dteSplitTm.getMinutes().toLocaleString().padStart(2, '0') + ":" + dteSplitTm.getSeconds().toLocaleString().padStart(2, '0')
                        + ":" + dteSplitTm.getMilliseconds().toLocaleString().padStart(2, '0');
                        //data["Split" + allRaces[idx].SplitId] = allRaces[idx].SplitTime
                        //data["TotalTime"] = allRaces[idx].SplitTime
                        racersSplits.push(data)
                }
            }else{
                console.log("adding the split empty arr")
                const data:any =  {"RaceId": allRaces[idx].RaceID,  "RaceDescription":allRaces[idx].RaceDescription,  "BibNumber": allRaces[idx].BibNumber}
               
                const splitDateTime = new Date(allRaces[idx].SplitDateTime)
                        const splitTm = splitDateTime.getTime() - RaceStartTime.getTime();
                        const dteSplitTm = new Date(splitTm)
                       
                       
                        data[allRaces[idx].SplitDescription] = dteSplitTm.getMinutes().toLocaleString().padStart(2, '0') + ":" + dteSplitTm.getSeconds().toLocaleString().padStart(2, '0')
                        + ":" + dteSplitTm.getMilliseconds().toLocaleString().padStart(2, '0');
                
                racersSplits.push(data)
            }
           
        }
  


        return Response.json(racersSplits)
    } catch (e) {
        console.log(e)
       return new Response("Error")
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