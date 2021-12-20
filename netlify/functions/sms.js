//require('dotenv').config()

//Twilio Credentials
//require('dotenv').config();
//const accountSid = process.env.TWILIO_ACCOUNT_SID;
const accountSid = 'AC09fd9693c3ea973c26dddf0c1f313c0f';
const authToken = 'b3d92ffa79994a2b84720bd31ed7bd2';
console.log('Your environment variable TWILIO_ACCOUNT_SID has the value: ', accountSid)
const twilio = require('twilio'); 
const client = new twilio(accountSid, authToken);

client.messages
.create({
   body: 'A golfer has submitted an order',
   to: '+12033139748',
   from: '+18648637454',
 })
.then((message) => console.log(message.sid));
