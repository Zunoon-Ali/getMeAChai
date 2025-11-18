"use server"

// import { Safepay } from '@sfpy/node-sdk'
import Payment from '@/models/Payment'
import connectDb from '@/db/connectDb';
import User from '@/models/User'
import { connect } from 'http2';

const transaction = sfp.createTransaction(
  "074e6fc652ea48b6ae881e83c5d9636f",          //code
  "ISCE",                                      //entity
  "Tuition",                                   //service
  "T0123",                                     //merchantRef
  "https://safepay-dev-10e5f.firebaseapp.com", //url_response
  "https://safepay-dev-10e5f.firebaseapp.com", //url_return
  132,                                         //currency
  15000,                                       //amount
  0)                                           //timeout
 
console.log("hash: ",transaction.hash())
 
console.log("CREATED")
console.log(transaction,"hash: ",transaction.hash())


console.log("PUBLISHED")
console.log(JSON.stringify(transaction.publish(), null, 2))


//test example of razorpay which i follow indian youtuber but in pakistan i used safepay below is sample api of razor pay create transaction 

// export const initiate = async (clearAllModuleContexts,to_username,paymentform) =>{
//     await connectDb
//     var instance = new Razorpay({key_id:process.env.SAFEPAY_PUBLIC_KEY,key_secret:process.env.SAFEPAY_SECRET_KEY})


//     let options = {

//         amount:Number.parseInt(amount),
//         currency:"PKR"
    
//     }

//     let x = await instance.orders.create(options)

//     await Payment.create({oid:x.id,amount:amount,to_username:to_username,name:paymentform.name,message:paymentform.message})


//     return x

// }



// https://github.com/getsafepay/node-core/tree/main