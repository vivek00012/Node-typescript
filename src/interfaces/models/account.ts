import mongoose from "mongoose"

export interface IAccount{
    creditBalance:number,
    totalDue:number,
    amountPaid:number,
    expenditure:number,
    paymentDate:string,
    emiMonths:number,// not implemented
    lateFeeApplied:boolean,
    accurredInterestRateOnCurrentDueInPercent:number,
    currentDue:number,
    dueDateOnCurrentMonth:string,
    closureInterestRateOnTotalDueInPercent:number,
    preClosed:boolean;
    totalOutstandingClosureDate:string,
    user:mongoose.Schema.Types.ObjectId
}

export default IAccount;
