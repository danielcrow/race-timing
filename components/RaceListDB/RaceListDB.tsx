import { Race, columns } from "@/components/RaceList/columns"
import { DataTable } from "@/components/RaceList/data-table"
import {getRaces} from "@/app/actions/sqlliteactions"
 
export default async function RaceListDB() {
    
    const data = await getRaces()
   
    return (<div>
            <div>
                <DataTable columns={columns} data={data}  />
            </div>
        </div>

    )
}