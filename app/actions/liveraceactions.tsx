import clientPromise from "@/app/api/database"
import {Race} from "@/components/RaceList/columns"
import {Result} from "@/components/RaceSplits/columns"
const DB =process.env.MONGODB
const collection: string  = "RaceSplits"
const athletes: string  = "Athletes"
const races: string = "races"

export async function getRaces(): Promise<Race[]> {
    try{
        console.log("DB",DB);
        console.log("Collection", collection);
        const db = (await clientPromise).db(DB);
        console.log("DbObj", db)
        let racesToReturn:Race[] = [];
        const allRaces = await db.collection(races).find({}).toArray()
        for(let idx in allRaces){
            const race = allRaces[idx];
         
            let raceToAdd:Race = {RaceId: race.RaceId, RaceDescription: race.RaceDescription, StartDateTime: race.StartDateTime}
            racesToReturn.push(raceToAdd);
        }

        


        console.log("Races", racesToReturn)
        return racesToReturn
    } catch (e) {
        return []
    }
}

export async function getRaceData(raceid:string, racestarttime:string): Promise<Result[]> {
    // Fetch data from your API here.
    const db = (await clientPromise).db(DB);
    const query =  { "RaceID": Number(raceid)};
    const athletesCollection = db.collection(athletes);
    const racesplits = db.collection(collection);
   // console.log("t",racestarttime)
    const RaceStartTime:Date = new Date(racestarttime)

    const allAthletes = await athletesCollection.find(query).toArray();
    let rtnObject:AthleteObj[] = []

    for(let ida in allAthletes){
        let athleteObj:AthleteObj = {"RaceId":"", "FirstName":"", "FinishTime":"","Surname":"","BibNumber":"","ChipNumber":"", "ChipStartTime":"","splits":[] };
        //const athlete:Athlete = allAthletes[ida]
        if(allAthletes[ida]["RaceID"]!=undefined){
            athleteObj["RaceId"] = allAthletes[ida]["RaceID"]
            athleteObj["FirstName"] = allAthletes[ida]["FName"]
            athleteObj["Surname"] = allAthletes[ida]["LName"]
            athleteObj['BibNumber'] = allAthletes[ida]["Notes"]
            athleteObj['ChipNumber'] = allAthletes[ida]["BibNumber"]
            if( allAthletes[ida]["ChipStartDateTime"]== null){
                athleteObj['ChipStartTime'] ="N/A"
            }else{
                athleteObj['ChipStartTime'] =allAthletes[ida]["ChipStartDateTime"]
            }
            athleteObj["splits"] = []
            rtnObject.push(athleteObj)
        }
    }
    
    const allRaces = await racesplits.find(query).sort({SplitDateTime: 1}).toArray();
   

    for(let idx in allRaces){
        const BibNumber = allRaces[idx].BibNumber  
        for (let idv in rtnObject){
            let dteSplitTm: Date =new Date();
            if(rtnObject[idv]["ChipNumber"]==BibNumber){
                if(rtnObject[idv]['ChipStartTime']!="N/A"){
                    
             
                    const splitDateTime = new Date(allRaces[idx].SplitDateTime)
                    
                    const prevSplitTime = new Date (rtnObject[idv]['ChipStartTime'])
                   
                    const splitTm = splitDateTime.getTime() - prevSplitTime.getTime();
                    dteSplitTm =  new Date(splitTm)
               

                }else{
                
                    const splitDateTime = new Date(allRaces[idx].SplitDateTime)
                    const prevSplitTime = new Date (allRaces[idx].PreviousSplitDateTime)
                    const splitTm = splitDateTime.getTime() - RaceStartTime.getTime();
                    dteSplitTm = new Date(splitTm)
                    //console.log( RaceStartTime)
                    //console.log("Split time", dteSplitTm)
                    
                }

                let FinishTime = "";
                if(allRaces[idx].SplitDescription=="Finish"){
                    FinishTime = dteSplitTm.getMinutes().toLocaleString().padStart(2, '0') + ":" + dteSplitTm.getSeconds().toLocaleString().padStart(2, '0')
                }
                else{
                    FinishTime = "88888";
                }
                let split = {"name": allRaces[idx].SplitDescription, "time": dteSplitTm.getMinutes().toLocaleString().padStart(2, '0') + ":" + dteSplitTm.getSeconds().toLocaleString().padStart(2, '0')};

                
                rtnObject[idv]["FinishTime"] =FinishTime;
                console.log("Danny", rtnObject[idv])
                if(rtnObject[idv].splits!=undefined){
                    rtnObject[idv].splits.push(split);
                }
            }
        }
    }

    for(let idx in rtnObject){
        console.log(rtnObject[idx]["FinishTime"]);
        if(rtnObject[idx]["FinishTime"]==""){
            rtnObject[idx]["FinishTime"]="99999";
        }
    }
   

    
    const val = JSON.stringify(rtnObject)
    //console.log(rtnObject)
    const obj = JSON.parse(val);

    (await clientPromise).close
    /*
    return [
      {
        id: "728ed52f",
        BibNumber: 100,
        ChipNumber: 100,
        FirstName: "Daniel",
        LastName: "Crow",
        FinishTime: "21:00:21"
      },
      // ...
    ]*/
   return obj
  }