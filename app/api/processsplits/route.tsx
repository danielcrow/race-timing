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

        const racedetails:any = await SetupRace(raceid);
        console.log(racedetails)
        const query =  { "RaceId": Number(raceid) };

        const db = (await clientPromise).db(DB)

        //Collection of Races
        const racesMongoDb =  db.collection(raceCollection);

        //Collection of Splits
        const raceSplitsDb = db.collection(collection)

        console.log(query)
        const allRaces:any = await racesMongoDb.find(query).toArray();

   
        
        if(isEmpty(allRaces)==false){
            console.log("found one")
            const splitDetails:any =await getsplits(raceid)
         
            console.log(splitDetails)
            const submittedAthletes = await raceSplitsDb.insertMany(splitDetails["splits"]);
        }else{
            console.log("race not found")
           
      
        }
    
        (await clientPromise).close

        return Response.json({"error":0,  "result":"success"})
    } catch (e) {
        console.log(e)
        return Response.json({"error":400,  "result":e})
    }

    function isEmpty(array:[]) {
        return Array.isArray(array) && array.length === 0
      }

    async function getsplits(raceid: string|null){
        try {

            const query:string =  "select * from splits where RaceID=" + raceid 
            const dbPath = path.join(process.cwd(), "public/assets/RaceTiming.db");
            console.log(query)
            const db = await open({filename: dbPath, // Specify the database file path
                driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
            });
            const splits = await db.all(query);1

            console.log(splits)
       
            let response = {}
            if(splits.length>0){
                console.log("found athletes")
                response= {"error":0, "splits": splits};
            }else{
                response = {"error":400};
            }
            return response;

        } catch (e) {
            console.log(e)
           return new Response("Error")
        }
    }
    

    async function SetupRace(raceid:string|null){
        try {

            const query:string =  "select * from race where id=" + raceid 
            const dbPath = path.join(process.cwd(), "public/assets/RaceTiming.db");
            console.log(dbPath)
            const db = await open({filename: dbPath, // Specify the database file path
                driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
            });
            const races = await db.all(query);


            console.log(races)
            let response = {}
            if(races.length>0){
                console.log("found race")
                response= {"error":0, "race": races[0]};
            }else{
                response = {"error":400};
            }
            return response;

        } catch (e) {
            console.log(e)
           return new Response("Error")
        }
    }
}