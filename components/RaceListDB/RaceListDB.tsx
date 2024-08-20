import { Race, columns } from "@/components/RaceListDB/columns"
import { DataTable } from "@/components/RaceListDB/data-table"
import {getRaces} from "@/app/actions/sqlliteactions"

 
export default async function RaceListDB() {
    
    const data:race[] = await getRaces()

   
    return (<div>
            <div>
                <DataTable columns={columns} data={data}  />
            </div>
        </div>

    )
}