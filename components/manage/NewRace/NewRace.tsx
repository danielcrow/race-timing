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


export default function NewRace(props: {id:string} ){
    const [data, setData] = useState({"RaceID": "", "RaceDescription":"", "StartDateTime":""})
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [isLoading, setLoading] = useState(true)
    const [raceid, setRaceId] = useState()
    const router = useRouter()


    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log("Submitting")
        const formData = new FormData(event.currentTarget)
        const response = await fetch('/api/submit', {
          method: 'POST',
          body: formData,
        })
     
        // Handle response if necessary
        const data = await response.json()
        // ...
      }

    const onClick = (event: any) =>{
        router.push('/dashboard/RaceEdit/AthleteEdit/race/' + data.RaceID)
      
    }
  
   

    const FormSchema = z.object({
        username: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
      })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          username: "",
        },
      })


      return    <div>

<Form {...form} >
    <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="ChipNumber">Race ID</Label>
        <Input type="text" id="ChipNumber" name="name" defaultValue={data.RaceID} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="FName">Race Description</Label>
        <Input type="text" id="FName" name="First Name" defaultValue={data.RaceDescription} />
      </div>
     
  
    
    <Button type="submit">Submit</Button>
    <Button onClick={onClick}>Return</Button>
</Form>
    
      </div>
}