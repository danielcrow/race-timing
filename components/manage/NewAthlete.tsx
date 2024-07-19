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

import {newAthlete} from "@/app/actions/actions"


export default function NewAthelete(props: {race:race}){
   

 
    const initialState:AthleteState = { message: null,success: false };

    const [state, formAction] = useFormState<AthleteState, FormData>(newAthlete, initialState);
    const [open, setOpen] = useState(false);

    const FormSchema = z.object({
        username: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
      })
    
    
    useEffect(() => {
   
      if (state.success) {
        console.log("Yey")
        setOpen(false)

      }
    
    },[state])
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          username: "",
        },
      })
      return  <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
              <Button variant="outline">New Athlete(Not coded)</Button>
              </DialogTrigger> 
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>New Athlete</DialogTitle>
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
                    <Input name="ChipNumber" className="col-span-3"  />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      BibNumber
                    </Label>
                    <Input name="BibNumber" className="col-span-3" />
                  </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    First name
                  </Label>
                  <Input name="FirstName" className="col-span-3" />
                </div>
              
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Last Name
                  </Label>
                  <Input name="LastName"  className="col-span-3" />
                </div>
              </div>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>
      </Dialog>
}