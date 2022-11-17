
import  Express from './Express'
import Database  from './Database';
import Log from '../middlewares/Log';
 
 class App { 

    /**
     * Loads server
     */
    public loadServer (): void {
         Log.info('Server :: Booting @ Master...');
         Express.init();
     }
 
     // Loads the Database Pool
     public loadDatabase (): void {
         Log.info('Database :: Booting @ Master...');
         Database.init();
     }
 
     /**
      * Loads worker
      */
     public loadWorker (): void {
         Log.info('Worker :: Booting @ Master...');
     }
 }
 
 export default new App;
 