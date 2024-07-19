'use server'
 
import clientPromise from "../api/database"
import * as mongoDB from "mongodb";
const DB =process.env.MONGODB
const collection: string  = "RaceSplits"
const athletes: string  = "Athletes"
const racesCollection: string = "races"



 


export async function updateAthlete(prevState: any, formData: FormData) {
    // ...
    try{
          console.log(formData  )
          const db = (await clientPromise).db(DB)
          const theCollection = await db.collection(athletes)
          console.log(DB)
          console.log(collection)
         
            
          const options = { upsert: false };
          
      
          // create a filter for a movie to update
          const filter = { "BibNumber": Number(formData.get("BibNumber")) };
          const updateDoc = {"$set": {"BibNumber":Number(formData.get("ChipNumber")), "Notes": Number(formData.get("BibNumber")), "FName": formData.get("FirstName"), "LName": formData.get("LastName"), "RaceID" : Number(formData.get("RaceId"))     }}
          console.log(updateDoc)
          console.log(filter)
          
          const result = await theCollection.updateOne(filter, updateDoc, options);
          
         
          /*

          const submittedDocument = await theCollection.insertOne(dummyData)
          console.log(submittedDocument);
          */
          (await clientPromise).close
  
          return {message: 'A message from the server action, yay!' ,success:true, FName: formData.get("FirstName"),LName: formData.get("LastName"), RaceId: formData.get("RaceId"), ChipNumber:formData.get("BibNumber"),BibNumber:formData.get("ChipNumber")  }
      }catch (e) {
    
          return {message: "It went wrong" ,success:false}
    }
}
export async function newRace(prevState: AthleteState, formData: FormData) {
    return {message: 'A message from the server action, yay!' ,success:true,}
}
export async function newAthlete(prevState: AthleteState, formData: FormData) {
    return {message: 'A message from the server action, yay!' ,success:true,}
}

  export async function updateRace(prevState: AthleteState, formData: FormData) {
    // ...
    try{
         
          const db = (await clientPromise).db(DB)
          const theCollection = await db.collection(racesCollection)

         
            
          const options = { upsert: false };
          
      
          // create a filter for a movie to update
          const filter = { "RaceId": Number(formData.get("raceId")) };
          const updateDoc = {"$set": {"RaceId":Number(formData.get("raceId")), "RaceDescription": formData.get("RaceDescription"), "RaceStartTime": formData.get("RaceStartTime")   }}
       
          
          const result = await theCollection.updateOne(filter, updateDoc, options);
          
         
      
          (await clientPromise).close
  
            //return {message: 'A message from the server action, yay!' ,success:true, RaceDescription: formData.get("RaceDescription"),RaceStartTime: formData.get("RaceStartTime"), RaceId: formData.get("raceId")}
            return {message: 'A message from the server action, yay!' ,success:true,}
        }catch (e) {
       
          return {message: "It went wrong" ,success:false}
  }
  
   
  }