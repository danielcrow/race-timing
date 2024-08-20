
import { useState, useEffect, FormEvent } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { useForm } from "react-hook-form"
  import { Card, CardContent, CardHeader, CardTitle,CardDescription } from '@/components/ui/card'

  import Link from 'next/link';
  import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
  } from "@tanstack/react-table"
import { table } from 'console';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useFormStatus, useFormState } from 'react-dom'
import {Result} from "@/components/RaceSplits/columns"
import SplitResult from './SplitResult';




export default function RacerResult(props: {row:any} ){
    console.log(props.row)
    return  <Dialog>
              <DialogTrigger asChild>
                <TableRow
                  key={props.row.id}
                  data-state={props.row.getIsSelected() && "selected"}
                >
                  {props.row.getVisibleCells().map((cell:any) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              </DialogTrigger> 
              
              <DialogContent className="max-w-screen h-screen">
                <DialogHeader>
                  <DialogTitle>Athlete Result</DialogTitle>
                  <DialogDescription>
                      Your Result Details
                  </DialogDescription>
                </DialogHeader>
                <Card>
      <CardHeader>
        <CardTitle>{props.row.original.FirstName + " " + props.row.original.Surname}</CardTitle>
        <CardDescription>Bib Number : {props.row.original.BibNumber}</CardDescription>
      </CardHeader>
      <CardContent>
          <h4 className="text-sm font-semibold">Finish time</h4>
          <p className="text-sm">
              Congratulations you finished the race in {props.row.original.FinishTime}
            </p>
                    
                  <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                      {props.row.original.splits.map((split:any) => (
                      <TableHead key={split.name }>{split.name }</TableHead>
                      
                      ))}
                       
                      </TableRow>
                    </TableHeader><TableBody>
                    <TableRow>
                    {props.row.original.splits.map((split:any) => (
                      
                        <TableCell key={split.time}>
                            <SplitResult time={split.time} position={split.position} avgTime={split.AverageTime}></SplitResult>
                          </TableCell>
                    
                  
                ))}
                </TableRow>
                      </TableBody></Table>
                </div>
                </CardContent>
                </Card>
               

        <DialogFooter>
        <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>

      </DialogContent>
      </Dialog>
}