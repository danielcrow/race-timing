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
  StartDateTime: string
}
 
export const columns: ColumnDef<race>[] = [
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
    accessorKey: "RaceShortName",
    header: "Race Short Name",
    cell: ({ row }) => {
     
      return <Link href={"./"+row.getValue("RaceId")+ "/" + row.getValue("StartDateTime")}>{row.getValue("RaceShortName")}</Link>
    }
  },

  {
    accessorKey: "StartDateTime",
    header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Race Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
     
        return <Link href={"./"+row.getValue("RaceId")+ "/" + row.getValue("StartDateTime")}>{new Date(row.getValue("StartDateTime") + " GMT").toDateString()}</Link>
      }
  },
  {

    header: "Actions",
    accessorKey: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const racer = row.original
      return (
        <Link href={"/dashboard/awards/" + racer.RaceId}>Awards</Link>
      )
    }
  }
]