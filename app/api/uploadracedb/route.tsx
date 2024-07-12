export const dynamic = 'force-dynamic' // defaults to auto
import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs" 
import { NextRequest } from "next/server"
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";


const DB =process.env.MONGODB
const collection: string  = "races"



export async function GET(request: NextRequest) {
    try {
    

        //console.log(allPosts)
        return Response.json({})
    } catch (e) {
        console.log(e)
       return new Response("Error")
    }
}

export async function POST(req: NextRequest, res: any) {
    console.log("Files")
    const formData = await req.formData();
    const file:any = formData.get("file");
    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename =  file.name.replaceAll(" ", "_");
    console.log(filename);
    

    try {
        fs.unlinkSync("public/assets/RaceTiming.db");
        await writeFile(
        path.join(process.cwd(), "public/assets/RaceTiming.db"),
        buffer
    );
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
        
     
}