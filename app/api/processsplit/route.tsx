import path from "path";
import clientPromise from "../database"
import { NextRequest } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
const DB =process.env.MONGODB
const collection: string  = "RaceSplits"


export async function POST(request: NextRequest) {
    try {
      
        const searchParams = request.nextUrl.searchParams
        const raceid:string|null = searchParams.get('raceid')
        const splitdescription:string|null = searchParams.get('splitdescription')
        const splittime:string|null = searchParams.get('splittime')
        const BibNumber:string|null = searchParams.get('BibNumber')
        

        const splitObject = {"BibNumber": BibNumber, "SplitDateTime": splittime,"SplitDescription": splitdescription, "RaceID": Number(raceid)}
        console.log(splitObject)
        const db = (await clientPromise).db(DB)


        //Collection of Splits
        const raceSplitsDb = db.collection(collection)

        const submittedAthletes = await raceSplitsDb.insertOne(splitObject);
        //console.log("Daniel", submittedAthletes)
    
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