
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
import ResultCharts from '../ResultCharts/ResultCharts'




export default function RacerResultDetails(props: {row:any} ){
    console.log(props.row)
    
    
  
  

    return  <Collapsible key={props.row.id} asChild>
            <>  
                <TableRow key={props.row.id}>
                  {props.row.getVisibleCells().map((cell:any) => (
                    <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  
                </TableCell>
                  ))}
                  
                </TableRow>
                
              
              <CollapsibleContent asChild>
              <div>
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
                  
                            <SplitResult key={split.id} split={split}></SplitResult>
                       
                         
                        ))}
                   
                    </TableBody>
                  </Table>
                  
                  <ResultCharts raceId={props.row.original.RaceId} athleteId={props.row.original.FirstName + " " + props.row.original.Surname}></ResultCharts>
                  </div>
              </CollapsibleContent>

              </>
            </Collapsible>
    
}