

// let sendSmsModel = require('../models/smsModel');

let day;
let hours;
let minutes;
let ampm;
let strTime;
(function (date){
    day = date.getDay();
    hours = date.getHours();
    minutes = date.getMinutes();
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    strTime = hours + ':' + minutes + ' ' + ampm;
})(new Date);

let  MongoClient = require('mongodb').MongoClient;
let  url = "mongodb+srv://root:root@cluster0-5sh5e.mongodb.net/<dbname>?retryWrites=true&w=majority";

const accountSid = 'AC198e8486db4446bbd18ae420899272e1'; // Your Account SID from www.twilio.com/console
const authToken = '8f650e166d84d1fafdd91a648814e548';   // Your Auth Token from www.twilio.com/console

const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

function sentSMS(water_level_1,water_level_2){

    client.messages.create({
        body: `9:00 AM: ${water_level_1} | 3:00 PM: ${water_level_2}`,
        to: '+959250931470',  // Text this number
        from: '+12105260435' // From a valid Twilio number
    })
    .then(() => console.log("Successful"));
  
}

let express = require('express');
let router = express.Router();

router.get('/sentsms' , (req ,res ,next)=>{

    MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
        if (err) throw err;
        let  dbo = db.db("dam_project");
        dbo.collection("dam_data").find({}).toArray(function(err, result) {
            if (err) throw err;
            let nineArray = [];
            let tewelveArray = [];
            let threeArray = [];

            for(let dam of result){
                if(dam.mark === 'one'){
                nineArray.push(dam.water_level);
                }else if(dam.mark === 'two'){
                tewelveArray.push(dam.water_level);
                }else{
                threeArray.push(dam.water_level);
                }
            } 
            switch (day) {
                case 1:
                    console.log('Monday');
                    sentSMS(nineArray[0],threeArray[0]);
                    break;
                case 2:
                    console.log('Tuesday');
                    sentSMS(nineArray[1],threeArray[1]);
                    break;
                case 3:
                    console.log('Wednesday');
                    sentSMS(nineArray[2],threeArray[2]);
                    break;
                case 4:
                    console.log('Thursday');
                    sentSMS(nineArray[3],threeArray[3]);
                    break;
                case 5:
                    console.log('Friday');
                    sentSMS(nineArray[4],threeArray[4]);
                    break;
                default:
                    break;
            }
            res.redirect('/');
            db.close();
        });
    });
})

module.exports = router;