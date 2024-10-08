"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { CollapsibleTrigger } from "../ui/collapsible"
import { Label } from "@radix-ui/react-label"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Result = {

  BibNumber: string
  ChipNumber: string
  FirstName: string
  Surname: string
  FinishTime: string
}
 
function formatDate(actualTime:number){
  const dteSplitTm = new Date(actualTime);
  return (dteSplitTm.getHours()-1).toString().padStart(2, '0') + ":" + dteSplitTm.getMinutes().toString().padStart(2, '0') + ":" + dteSplitTm.getSeconds().toLocaleString().padStart(2, '0') +  "." + dteSplitTm.getMilliseconds().toLocaleString().padStart(2, '0')

}

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: 'Name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <CollapsibleTrigger>
            <Button variant="ghost">
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Label>{row.getValue('FirstName') + " " + row.getValue('Surname')}</Label>
            
          </CollapsibleTrigger>
        </div>
      );
  }
  },
  {
    accessorKey: "BibNumber",
    header: "ChipNumber",
    enableHiding: true,
  },
  {
    accessorKey: "ChipNumber",
    header: "BibNumber",
  },
  {
    accessorKey: "FirstName",
    header: "FirstName",
  },
  {
    accessorKey: "FinishTimeActual",
    header: "FinishTimeActual",
  },
  {
    accessorKey: "Surname",
    header: "Surname",
  },
  {
    accessorKey: "ChipStartTime",
    header: "Start Time",
    cell: ({ row }) => {
      return (row.getValue('ChipStartTime'))
    }
  },
  
  {
    accessorKey: "FinishTime",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Finish Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        if(row.getValue("FinishTime")=="88888"){
          return "DNF"
        }
        else if(row.getValue("FinishTime")=="99999"){
          return "DNS"
        }
        else{
          console.log(row.getValue("FinishTimeActual"))
          return formatDate(row.getValue("FinishTimeActual"))
        }
      }
  },
  {

    header: "Actions",
    accessorKey: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const racer = row.original
      return (
        <Button>See Details</Button>
      )
    }
  }
]