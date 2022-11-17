import { Router } from 'express';


import AccountController from '../controllers/Account/CreateAccount';
import UserController from '../controllers/User/User';

const router = Router();


router.get('/',(req,res)=>{
    //check whether api is running or not
    res.send("api is running");
})
router.post('/createUser', UserController.perform);
router.post('/createAccount', AccountController.perform);

export default router;
