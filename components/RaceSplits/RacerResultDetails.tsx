
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




export default function RacerResultDetails(props: {row:any} ){
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
               
         
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell>Split</TableCell>
                        <TableCell>Split Position</TableCell>
                        <TableCell>Split Time</TableCell>
                        <TableCell>Avg Split Time</TableCell>
                        <TableCell>Cumulative Split Time</TableCell>
                        <TableCell>Cumulative Position</TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>    
                        {props.row.original.splits.map((split:any) => (
                  
                            <SplitResult split={split}></SplitResult>
                       
                         
                        ))}
                   
                    </TableBody>
                  </Table>
                  
             
              </CollapsibleContent>
              </>
            </Collapsible>
    
}