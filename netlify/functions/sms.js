//require('dotenv').config()

//Twilio Credentials
//require('dotenv').config();
//const accountSid = process.env.TWILIO_ACCOUNT_SID;
const accountSid = AC09fd9693c3ea973c26dddf0c1f313c0f;
const authToken = b3d92ffa79994a2b84720bd31ed7bd2;
console.log('Your environment variable TWILIO_ACCOUNT_SID has the value: ', TWILIO_ACCOUNT_SID)
const client = require('twilio')(accountSid, authToken);

client.messages
.create({
   body: 'A golfer has submitted an order',
   from: '+18648637454',
   to: '+12033139748'
 })
.then(message => console.log(message.sid));