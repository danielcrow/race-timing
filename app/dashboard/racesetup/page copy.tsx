'use client'
import { useState, useEffect } from 'react'
import RaceDbUploader from  '@/components/racedatabase/racedbuploader/racedbuploader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'

export default function Page() {

  const [race, setRace] = useState("")
  const [dbStatus, setDBStatus] = useState(false) 



  const setLiveDBStatus = (status:boolean) =>{
    setDBStatus(status);
    console.log(status)
  }

    return <div className="flex min-h-screen w-full flex-col">
 
             <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-4" x-chunk="dashboard-01-chunk-4">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Subscriptions
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                    <CardContent>
                        <RaceDbUploader dbstatus={setLiveDBStatus}></RaceDbUploader>
                    </CardContent>
                </Card>
         <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
        
              </CardHeader>
              <CardContent>
                  Hello World
              </CardContent>
         </Card>
         </div>
        
      </div>
  }