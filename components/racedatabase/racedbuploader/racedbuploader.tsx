'use client'
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';


export default function racedbuploader(props: any) {
    
    const handleFileUpload = async (event: {target: { files: FileList|null; }}) => {
      //check an event has happened if not fail it
        if (!event.target.files) return;
        
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
    
        // Send formData to server-side endpoint
        const response = await fetch('/api/uploadracedb', {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          // File uploaded successfully
            console.log("Yey")
            props.dbstatus(true)
        } else {
          // Handle error
            props.dbstatus(false)
        }
      
      };

    return <div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Label>Upload Race Timing Database</Label><Input type="file" onChange={(event) => {handleFileUpload(event)}} />
        </div>
    </div>
}