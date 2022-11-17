import IAccount from '../interfaces/models/account';
import mongoose from 'mongoose';
import * as moment from 'moment'

export interface IAccountModel extends IAccount, mongoose.Document {
    // add methods here
    getCalculatedData(req,id): IAccount
}
const dueDate = moment().utc().startOf('month').add(5, 'd').toString();


// Define the Account Schema
export const AccountSchema = new mongoose.Schema<IAccountModel>({
    creditBalance: { type: Number, default: parseInt(process.env.CREDIT_BALANCE) },
    totalDue: { type: Number, default: 0 },
    currentDue: { type: Number, default: 0 },
    amountPaid: { type: Number, default: 0 },
    lateFeeApplied: { type: Boolean, default: false },
    expenditure:{type: Number, default: 0 },
    paymentDate: { type: String,default:null },
    emiMonths:{ type: Number,default:0},
    accurredInterestRateOnCurrentDueInPercent: {
        type: Number,
        default: 3.4,
    },
    dueDateOnCurrentMonth: { type: String, default: dueDate },
    closureInterestRateOnTotalDueInPercent: { type: Number },
    totalOutstandingClosureDate: { type: String },
    preClosed: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

AccountSchema.methods.toJSON = function () {
    const account = this;
    const accountObject = account.toObject();
    delete accountObject.accurredInterestRate
    delete accountObject.closureInterestRateOnTotalDueInPercent
    delete accountObject.preClosed
    return accountObject;
}

AccountSchema.methods.getCalculatedData = async function (req: IAccountModel,id:mongoose.Schema.Types.ObjectId) {
    const lateFee = parseInt(process.env.LATE_FEE);
    const accurredInterestRate = req.accurredInterestRateOnCurrentDueInPercent;
    let currentDue: number = Number(((req.currentDue * req.accurredInterestRateOnCurrentDueInPercent) / 100));

    if (req.expenditure === 0) {
        req.accurredInterestRateOnCurrentDueInPercent = 0;
        req.dueDateOnCurrentMonth = null;
    } else {
        req.totalDue = (req.creditBalance - req.expenditure) + ((req.accurredInterestRateOnCurrentDueInPercent/100)*req.expenditure);
        req.creditBalance = req.creditBalance - req.expenditure;
        if (moment().isAfter(moment(req.dueDateOnCurrentMonth))) {
            currentDue = + lateFee;
            req.accurredInterestRateOnCurrentDueInPercent = Number((((lateFee / req.currentDue) * 100) + accurredInterestRate).toFixed(2));
            req.currentDue = currentDue;
        }
    }
    req.user = id;
}

const Account = mongoose.model<IAccountModel>('Account', AccountSchema);

export default Account;
