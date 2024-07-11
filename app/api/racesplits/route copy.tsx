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
        console.log(raceid)
        const db = (await clientPromise).db(DB);
        const query =  { "RaceID": Number(raceid) };

        const racesplits = db.collection(collection);
        const allRaces = await racesplits.find(query).toArray();
        console.log(query)
        let racersSplits: any[] = []

        for(let idx in allRaces){
            const BibNumber = allRaces[idx].BibNumber  
            console.log(BibNumber)
            if(racersSplits.length != 0){
                let bibfound=false;
                for(let idv in racersSplits){
                    if(racersSplits[idv].BibNumber == allRaces[idx].BibNumber){
                        racersSplits[idv]["Split" + allRaces[idx].SplitId] = allRaces[idx].SplitTime
                        console.log("updating the split",racersSplits[idv].TotalTime)
                        console.log("Timeing", allRaces[idx].SplitTime)
                        
                        //racersSplits[idv]["TotalTime"] = racersSplits[idv].TotalTime+ allRaces[idx].SplitTime
                        //console.log("Total Time = ", racersSplits[idx]["TotalTime"])
                        bibfound=true;
                    }
                }
                if (bibfound==false){
                    console.log("adding the split",allRaces[idx].BibNumber)
                        const splitidv =  "Split" + allRaces[idx].SplitId
                        const data:any =  {"RaceId": allRaces[idx].RaceID,  "RaceDescription":allRaces[idx].RaceDescription,   "BibNumber": allRaces[idx].BibNumber}
                        data["Split" + allRaces[idx].SplitId] = allRaces[idx].SplitTime
                        data["TotalTime"] = allRaces[idx].SplitTime
                        racersSplits.push(data)
                }
            }else{
                console.log("adding the split empty arr")
                const data:any =  {"RaceId": allRaces[idx].RaceID,  "RaceDescription":allRaces[idx].RaceDescription,  "BibNumber": allRaces[idx].BibNumber}
                data["Split" + allRaces[idx].SplitId] = allRaces[idx].SplitTime
                data["TotalTime"] = allRaces[idx].SplitTime
                console.log(data["TotalTime"] )
                //tdelta = new timedelta(allRaces[idx].SplitTime)
                let tstamp = new Date(allRaces[idx].SplitTime)
                console.log(allRaces[idx].SplitTime)
                racersSplits.push(data)
            }
           
        }
        console.log("Race", racersSplits)

        
        //const allRaces = await db.collection(collection).aggregate().match({RaceId: "1"}).
        //const allRaces = await db.collection(collection).distinct( "RaceDescription" )

        //const allRaces = await db.collection(collection).find({"RaceDescription": "The Race"}).toArray()


        return Response.json(racersSplits)
    } catch (e) {
        console.log(e)
       return new Response("Error")
    }
}

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