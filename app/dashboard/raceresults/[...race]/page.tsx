import { Result, columns } from "@/components/RaceSplits/columns"
import { RaceResults } from "@/components/RaceSplits/raceresults"
import {getRaceData} from "@/app/actions/sqlliteactions"
import { usePathname } from 'next/navigation'
import { Button} from '@/components/ui/button'
import Link from 'next/link';
import { Label } from "@/components/ui/label"
import RaceListDB from "@/components/RaceListDB/RaceListDB"
export const revalidate = 0
export default async function Page(pageParams:PageProps) {

    const raceP:raceParams = pageParams.params

   console.log(raceP)
    if(raceP.race=="0"){
    return (<div>
                <div>
                    <RaceListDB></RaceListDB>
                   
                </div>
            </div>
    )}else{
        const startTime:string = decodeURIComponent(pageParams.params.race[1])
        //console.log("starttime",startTime)
        const data = await getRaceData(String(pageParams.params.race[0]),startTime)
        return (<div> 
                
                    <RaceResults columns={columns} data={data} ></RaceResults>
                </div>)
    }

}