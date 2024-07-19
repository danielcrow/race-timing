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
import {updateRace} from '@/app/actions/actions'



export default function EditRace(props: {race:race} ){

    const initialState:AthleteState = { message: null,success: false };

    const [state, formAction] = useFormState<AthleteState, FormData>(updateRace, initialState);
    const [open, setOpen] = useState(false);
    useEffect(() => {
   
      if (state.success) {
        console.log(state)
        //props.race.RaceStartTime = state.RaceStartTime
        //props.race.RaceDescription = state.RaceDescription
        console.log("Yey")
        setOpen(false)

      }
    
    },[state,props])

   
    return   <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant="outline">Edit Race</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Race</DialogTitle>
        <DialogDescription>
          Make changes to your Race here.
        </DialogDescription>
      </DialogHeader>
      <form id="myForm" action={formAction} >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="raceId" className="text-right">
            ID
          </Label>
          <Input name="raceId" defaultValue={props.race.RaceId} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="RaceDescription" className="text-right">
             Description
          </Label>
          <Input name="RaceDescription" defaultValue={props.race.RaceDescription} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="RaceStartTime" className="text-right">
            Start Time
          </Label>
          <Input name="RaceStartTime" defaultValue={props.race.StartDateTime} className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>

}