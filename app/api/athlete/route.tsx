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
        const id = searchParams.get("athleteId")
        let query = {}
        if(id == null){
             query =  { "RaceID": Number(raceid)};
        }else{
             query =  {  "ID": Number(id)};
        }

        const racestarttime:any = searchParams.get('racestarttime')
        const RaceStartTime:Date|null = new Date(racestarttime)
        console.log(raceid)
        const db = (await clientPromise).db(DB);
        //const query =  { "RaceID": Number(raceid)};


        const athletesCollection = db.collection(athletes);

         const allAthletes = await athletesCollection.find(query).toArray();
  
      
         (await clientPromise).close
        return Response.json(allAthletes)
    } catch (e) {
     
        (await clientPromise).close
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