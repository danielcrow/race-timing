import path from "path";
import sqlite3 from "sqlite3";
export const dynamic = 'force-dynamic' // defaults to auto
import { NextApiRequest, NextApiResponse } from "next"
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const dbPath = path.join(process.cwd(), "public/assets/profile.db");
        console.log(dbPath)
        const db = new sqlite3.Database(
            dbPath,
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        (err) => {
        if (err) {
            console.error(err.message);
        }
    console.log("Connected to the profile database.");
    }
);



    } catch (e) {
        console.log(e)
       return new Response("Error")
    }
}
const dbPath = path.join(process.cwd(), "profile.db");
export const db = new sqlite3.Database(
 dbPath,
 sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
 (err) => {
  if (err) {
   console.error(err.message);
  }
  console.log("Connected to the profile database.");
 }
);