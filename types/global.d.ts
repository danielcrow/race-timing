export {}

import type { MongoClient } from 'mongodb'

declare global {
  namespace globalThis {
    var _mongoClientPromise: Promise<MongoClient>
  }
}

declare global {
    interface race {
      RaceId: string

    }


  }