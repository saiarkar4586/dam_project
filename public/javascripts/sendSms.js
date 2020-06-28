// let hours;
// let minutes;
// let ampm;
// let strTime;
// let days;

// function formatAMPM(date) {
//   days = data.getDays();
//   hours = date.getHours();
//   minutes = date.getMinutes();
//   ampm = hours >= 12 ? 'pm' : 'am';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? '0'+minutes : minutes;
//   strTime = hours + ':' + minutes + ' ' + ampm;
// }
// formatAMPM(new Date)

// const accountSid = 'AC198e8486db4446bbd18ae420899272e1'; // Your Account SID from www.twilio.com/console
// const authToken = '8f650e166d84d1fafdd91a648814e548';   // Your Auth Token from www.twilio.com/console

// const twilio = require('twilio');
// const client = new twilio(accountSid, authToken);

// function sentSms(water_level_1,water_level_2){

//     client.messages.create({
//         body: `9:00 AM: ${water_level_1} | 3:00 PM: ${water_level_2}`,
//         to: '+959250931470',  // Text this number
//         from: '+12105260435' // From a valid Twilio number
//     })
//     .then(() => console.log("Successful"));
  
// }

// function checkDay(){
//   switch (days) {
//     case 1:
//       console.log('monday');
//       sentSms(nineArray[0],threeArray[0]);
//       break;
//     case 2:
//       console.log('tuesday');
//       sentSms(nineArray[1],threeArray[1]);
//       break;
//     case 3:
//       console.log('wednesday');
//       sentSms(nineArray[2],threeArray[2]);
//       break;
//     case 4:
//       console.log('thursday');
//       sentSms(nineArray[3],threeArray[3]);
//       break;
//     case 5:
//       console.log('friday');
//       sentSms(nineArray[4],threeArray[4]);
//       break;
//     default:
//       break;
//   }
// }


// function myFunction(){
//   checkDay()
//   alert('Successful Sending SMS');
// }
