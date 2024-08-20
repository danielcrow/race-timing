
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
  import { CaretSortIcon, FaceIcon, ImageIcon, SunIcon } from '@radix-ui/react-icons'
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

import { ScrollArea } from "@/components/ui/scroll-area"

import { useFormStatus, useFormState } from 'react-dom'
import {Result} from "@/components/RaceSplits/columns"
import SplitResult from './SplitResult';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';




export default function RacerResult(props: {row:any} ){
    console.log(props.row)
    function showData(cell:any){
      //console.log(cell.column.id);
      if(cell.column.id == "Details"){
        return   <CollapsibleTrigger asChild>
                  <TableCell>
                  <Button variant="ghost" size="sm">
                  Split Details
                    <CaretSortIcon className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                        
                  </Button>

                  </TableCell>
    
              </CollapsibleTrigger> 
      }else{
      return  <TableCell key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      
    </TableCell>
    }
  }

    return  <Collapsible key={props.row.id} asChild>
            <>  
                <TableRow
                  key={props.row.id}
                  data-state={props.row.getIsSelected() && "selected"}
                >
                  {props.row.getVisibleCells().map((cell:any) => (
                   
                    showData(cell)
                  ))}
                  
                </TableRow>
                
              
              <CollapsibleContent asChild>
                <Card className="w-full max-w-screen  rounded-lg overflow-hidden shadow-lg">
                  <CardHeader>
                    <CardTitle>{props.row.original.FirstName + " " + props.row.original.Surname}</CardTitle>
                    <CardDescription>Bib Number : {props.row.original.BibNumber}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 h-screen overflow-auto">

                    <h4 className="text-sm font-semibold">Finish time</h4>
                    <p className="text-sm">
                        Congratulations you finished the race in {props.row.original.FinishTime}
                    </p>
                      <div>
                          {props.row.original.splits.map((split:any) => (
                            <SplitResult time={split.time} name={split.name} position={split.position} avgTime={split.AverageTime} splitName='Hello' cumTime={split.ActualCumulativeTime} cumPos={split.CumumlativeSplitPosition}></SplitResult>
                        
                          ))}
                      </div>    
                    </CardContent>
                  </Card>
              </CollapsibleContent>
              </>
            </Collapsible>
    
}