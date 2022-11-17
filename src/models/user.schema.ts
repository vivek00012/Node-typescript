import IUser   from '../interfaces/models/user';
import mongoose from 'mongoose';
import * as validator from 'validator';

 export interface IUserModel extends IUser, mongoose.Document {
    
 }
 
 // Define the User Schema
 export const UserSchema = new mongoose.Schema<IUserModel>({
     name: { type: String,required:true },
     emailAddress:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }}
        },
            monthlyExpense:{type:Number,required:true},
            monthlySalary:{type:Number,required:true}
 }, {
     timestamps: true
 });
 
 const User = mongoose.model<IUserModel>('User', UserSchema);
 
 export default User;
 