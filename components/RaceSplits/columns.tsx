"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Result = {
  id: string
  BibNumber: number
  ChipNumber: number
  FirstName: string
  LastName: string
  FinishTime: Date
}
 
export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: "BibNumber",
    header: "ChipNumber",
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
    accessorKey: "Surname",
    header: "Surname",
  },
  {
    accessorKey: "ChipStartTime",
    header: "ChipStartTime",
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
          return row.getValue("FinishTime")
        }
      }
  },
]