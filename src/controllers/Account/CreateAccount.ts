import { IAccount } from '../../interfaces/models/account';
import Account, { AccountSchema } from '../../models/account.schema';
import User from '../../models/user.schema';
import * as moment from 'moment';
import Log from '../../middlewares/Log';


class CreateAccount {
      /**
       * CreateAccount controller action method for api/createAccount 
       * @param req 
       * @param res 
       * @returns 
       */
        public static async perform(req, res): Promise<any> {
        const fields =['email'];
        const body = Object.keys(req.body);
        const isValidOperation = body.every(update=>fields.includes(update));
        Log.info("IN CREATE ACCOUNT CONTROLLER");
        if(!isValidOperation){
                return res.status(400).send({error:'Bad Request!'})
        }

        try {
         const user = await User.findOne({emailAddress:req.body.email});
         if(!user){
           return res.status(403).send('Unauthorised');
         }
         const userAccount = await Account.findOne({user:user._id});
         if(userAccount){
           return res.status(500).send('Account Already Exits');
         }
         if((user.monthlySalary-user.monthlyExpense) <1000){
                res.status(500).send('Unable to Create Account');
                return;
         }

         let account = await new Account()
         await account.getCalculatedData(account,user._id);
         await account.save();
         res.status(201).send(account);
        } catch (e) {
           res.status(500).send('Unable to Create Account');
        }

        }
}

export default CreateAccount;