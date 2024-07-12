import path from "path";
import sqlite3 from "sqlite3";
export const dynamic = 'force-dynamic' // defaults to auto
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server";
import { open, Database } from "sqlite";

export async function GET(request: NextRequest) {
    try {

        const query:string =  "select * from race"
        const dbPath = path.join(process.cwd(), "public/assets/RaceTiming.db");
        console.log(dbPath)
        const db = await open({filename: dbPath, // Specify the database file path
            driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
        });
        
        const races = await db.all(query);
        return new Response(JSON.stringify(races), {
            headers: { "Content-Type": "application/json" },
            status: 200,
          });
    } catch (e) {
        console.log(e)
       return new Response("Error")
    }
}