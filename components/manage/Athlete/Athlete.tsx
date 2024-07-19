'use client'
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
  import Link from 'next/link';
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
import {updateAthlete} from '@/app/actions/actions'



export default function Athlete(props: {athlete:Athlete, raceObj:race} ){
    const athlete = props.athlete

    const initialState:initialStateAthlete = { message: null,success: false, FName: "", LName: "", RaceId: "",  ChipNumber: "", BibNumber: "" };
    
    //const [FName, setFName] = useState(props.athlete.FirstName);

    const [state, formAction] = useFormState<AthleteState, FormData>(updateAthlete, initialState);

    const [open, setOpen] = useState(false);

    useEffect(() => {
      
      if (state.success) {
        
        /*
        props.athlete.FName=state.FName;
        props.athlete.LName=state.LName;
        props.athlete.Notes=state.BibNumber;
        props.athlete.ChipNumber=state.ChipNumber;
        */
        setOpen(false)
      }
    },[state,props])

      return  <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <TableRow key={athlete.RaceID}>
                    <TableCell>{athlete.Notes}</TableCell>
                    <TableCell>{athlete.BibNumber}</TableCell>
                    <TableCell>{athlete.FName}</TableCell>
                    <TableCell>{athlete.LName}</TableCell>
                </TableRow>
              </DialogTrigger> 
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Athlete</DialogTitle>
                  <DialogDescription>
                      Make changes to your Athlete here.
                  </DialogDescription>
                </DialogHeader>
                <form id="myForm" action={formAction} >
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      ChipNumber
                    </Label>
                    <Input name="ChipNumber" defaultValue={props.athlete.BibNumber} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="BibNumber" className="text-right">
                      BibNumber
                    </Label>
                    <Input name="BibNumber" defaultValue={props.athlete.Notes} className="col-span-3" />
                  </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    First name
                  </Label>
                  <Input name="FirstName" defaultValue={props.athlete.FName} className="col-span-3" />
                </div>
              
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Last Name
                  </Label>
                  <Input name="LastName" defaultValue={props.athlete.LName} className="col-span-3" />
                </div>
         
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    RaceId
                  </Label>
                  <Input name="RaceId" defaultValue={props.raceObj.RaceId} className="col-span-3"/>
                </div>
              </div>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
      </Dialog>
}