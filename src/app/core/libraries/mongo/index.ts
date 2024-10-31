import { environment } from '@/environments'
import { MongoClient } from 'mongodb'

if (!environment.ATLAS_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = environment.ATLAS_URI

let client: MongoClient

if (environment.ATLAS_URI === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri)
  }
  client = globalWithMongo._mongoClient
} else {
  client = new MongoClient(uri)
}

const connect = async () => {
  try {
    const mongoClient = await client.connect()
    await mongoClient.db('admin').command({ ping: 1 })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export { client, connect }
