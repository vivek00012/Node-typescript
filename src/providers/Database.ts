import mongoose from 'mongoose'
import Log from '../middlewares/Log';
import {MongoMemoryServer} from 'mongodb-memory-server'



export class Database {

     public _mongoServer?: MongoMemoryServer;
     private static _instance: Database;


     static getInstance(): Database {
          if (!Database._instance) {
               Database._instance = new Database()
          }
          return Database._instance
     }

     public async init(): Promise<void> {
     try {
          if (process.env.MONGODB_URL === 'inmemory') {
               Log.info('connecting to inmemory mongo db')
               this._mongoServer = await MongoMemoryServer.create();
               await mongoose.connect(this._mongoServer.getUri())
          } else {
               Log.info('connecting to mongo db')
               mongoose.connect(process.env.MONGODB_URL)
          }
     
          mongoose.connection.on('connected', () => {
               Log.info('Mongo: connected')
          })
     
          mongoose.connection.on('disconnected', () => {
               Log.error('Mongo: disconnected')
          })
     
          mongoose.connection.on('error', (err) => {
               Log.error(`Mongo:  ${String(err)}`)
               if (err.name === "MongoNetworkError") {
               setTimeout(function() {
                    mongoose.connect(process.env.MONGODB_URL).catch(() => { })
               }, 5000)
               }
          })
          } catch (err) {
          Log.error(`Database.init: ${err}`)
          throw err
          } 
     }

     public async close(): Promise<void> {
          try {
            await  mongoose.disconnect()
            if (process.env.MONGODB_URL === 'inmemory') {
              await this._mongoServer!.stop()
            }
          } catch (err) {
            Log.error(`Database.init: ${err}`)
          }
     }
}
 
 export default Database.getInstance();
