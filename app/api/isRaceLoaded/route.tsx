import path from "path";
import clientPromise from "../database"
import { NextRequest } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
const DB =process.env.MONGODB
const collection: string  = "RaceSplits"
const raceCollection: string ="races"
const raceAtheletes: string ="Athletes"

export async function POST(request: NextRequest) {
    try {
      
        const searchParams = request.nextUrl.searchParams
        const raceid:string|null = searchParams.get('raceid')
        console.log(raceid)
        const query =  { "RaceId": Number(raceid) };
        let raceFound:boolean = false;
        const db = (await clientPromise).db(DB)
        const racesMongoDb =  db.collection(raceCollection);
    
        console.log(query)
        const allRaces:any = await racesMongoDb.find(query).toArray();

   
        
        if(isEmpty(allRaces)==false){
            console.log("found one")
            raceFound = true;
        }else{
            console.log("race not found")
            raceFound = false;
          
        }
    
        (await clientPromise).close

        return Response.json({"error":0,  "found":raceFound})
    } catch (e) {
        console.log(e)
        return Response.json({"error":400,  "result":e})
    }

    function isEmpty(array:[]) {
        return Array.isArray(array) && array.length === 0
      }

    
    

   
}