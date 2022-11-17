import UserSchema from '../../models/user.schema';
import { Request, Response } from 'express';
import Log from '../../middlewares/Log';

class User {
    /**
    * User controller action method for api/createUser 
     * @param req 
     * @param res 
     * @returns 
     */
    public static perform = async (req: Request, res: Response) => {
        try {
            Log.info("IN USER CONTROLLER");
            const checkUser = await UserSchema.findOne({ emailAddress: req.body.email });
            if (checkUser) {
                return res.status(400).send('User Already Existss');
            }

            const newUser = new UserSchema(req.body);

            await newUser.save();
            res.status(201).send(newUser);
        } catch (e) {
            res.status(400).send(e);
        }

    }
}

export default User;