export {}

import type { MongoClient } from 'mongodb'

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>
  }
}

declare global {
    
    interface Athlete {
      RaceID: string;
      Notes: string;
      FName: string;
      LName: string;
      BibNumber: string;
      ChipStartDateTime: string;
    }

    type raceParams = {
      race:string;
      starttime:string;
    }
    type PageProps = {
      params: raceParams;
      searchParams?: { [key: string]: string | string[] | undefined };
    }
type initialStateAthlete = {
      message:    string;
      success:    boolean;
      FName:      string;
      LName:      string;
      RaceId:     string;
      ChipNumber: string;
      BibNumber:  string;
  }
  
  interface splitResults {
      bibNumber:string;
      splitName:string, 
      splitTime:string;
      ActualCumulativeTime:numnber;
  }

    interface AthleteObj {
      RaceId: string;
      ChipNumber: string;
      FirstName: string;
      Surname: string;
      BibNumber: string;
      ChipStartTime: string;
      splits: Splits[]
      FinishTime: string;
      FinishTimeActual: number;
    }
    
    interface Splits{
      name: string;
      time: string;
      position: number;
      actualTime: number;
      AverageActualTime: number;
      AverageTime: string;
      ActualCumulativeTime: number;
      CumulativeTime: string;
      CumumlativeSplitPosition: number;
    }
    interface race {
      RaceId: string;
      StartDateTime: string;
      RaceDescription: string;
    
    }
    export type State = {
      message: string | null;
      success: boolean;
      RaceId: string;
      FName: string;
      LName: string;
      ChipNumber: string;
      BibNumber: string;
    };
    export type AthleteState = {
      message: string | null;
      success: boolean;
    };

  }