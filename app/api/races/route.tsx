export const dynamic = 'force-dynamic' // defaults to auto
import { NextApiRequest, NextApiResponse } from "next"
import clientPromise from "./../database"
import { NextRequest } from "next/server"

const DB =process.env.MONGODB
const collection: string  = "races"

const dummyData = [{"RaceId": 1,  "RaceDescription": "The Race", "SplitId": 1,  "BibNumber": 1,  "SplitTime": "12:00:01.001","AthleteID": 1 },{"RaceId": 1,  "RaceDescription": "The Race", "SplitId": 1,  "BibNumber": 1,  "SplitTime": "12:00:01.001","AthleteID": 1 }]



export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const query = searchParams.get('query')
        console.log(query)
        const db = (await clientPromise).db(DB);
   
      

        //const allRaces = await db.collection(collection).distinct( "RaceDescription" )

        const allRaces = await db.collection(collection).find({}).toArray()

        console.log(allRaces)
        return Response.json(allRaces)
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
        
        const submittedDocument = await theCollection.insertOne(dummyData)
        console.log(submittedDocument);
        (await clientPromise).close

        return Response.json("{Results: []}")
    } catch (e) {
        console.log(e)
       return new Response("Error")
    }
}