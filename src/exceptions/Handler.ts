/**
 * Define the error & exception handlers
 */

 import Log from '../middlewares/Log';
 
 class Handler {
     /**
      * Handles your api routes errors/exception
      * @param err 
      * @param req 
      * @param res 
      * @param next 
      * @returns response with status and error message
      */
     public static clientErrorHandler(err, req, res, next): any {
         Log.error(err.stack);
 
         if (req.xhr) {
             return res.status(500).send({error: 'Something went wrong!'});
         } else {
             return next(err);
         }
     }
 
     /**
      * Register your error / exception monitoring
      * @param err 
      * @param req 
      * @param res 
      * @param next  
      */
     public static logErrors(err, req, res, next): any {
         Log.error(err.stack);
 
         return next(err);
     }
 }
 
 export default Handler;
 