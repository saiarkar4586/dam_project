

const accountSid = 'AC198e8486db4446bbd18ae420899272e1'; // Your Account SID from www.twilio.com/console
const authToken = '8f650e166d84d1fafdd91a648814e548';   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

function sendSms(water_level_1,water_level_2){

    client.messages.create({
        body: `9:00 AM: ${water_level_1} | 3:00 PM: ${water_level_2}`,
        to: '+959250931470',  // Text this number
        from: '+12105260435' // From a valid Twilio number
    })
    .then(() => console.log("Successful"));
  
}






