"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from 'next/link';
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Race = {
  RaceId: string
  RaceDescription: number
  StartDateTime: number
}
 
export const columns: ColumnDef<Race>[] = [
  {
    accessorKey: "RaceId",
    header: "RaceId",
    cell: ({ row }) => {
     
      return <Link href={"./"+row.getValue("RaceId")+ "/" + row.getValue("StartDateTime")}>{row.getValue("RaceId")}</Link>
    }
   // cell: props => <Link href={"./"+props.getValue()}>{props.getValue()}</Link>,
  },
  {
    accessorKey: "RaceDescription",
    header: "Race Description",
    cell: ({ row }) => {
     
      return <Link href={"./"+row.getValue("RaceId")+ "/" + row.getValue("StartDateTime")}>{row.getValue("RaceDescription")}</Link>
    }
  },

  {
    accessorKey: "StartDateTime",
    header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
           Start Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
     
        return <Link href={"./"+row.getValue("RaceId")+ "/" + row.getValue("StartDateTime")}>{row.getValue("StartDateTime")}</Link>
      }
  },
]