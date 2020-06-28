let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://root:root@cluster0-5sh5e.mongodb.net/test?retryWrites=true&w=majority";


MongoClient.connect(url, {useUnifiedTopology: true , useNewUrlParser : true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("dan");
  dbo.collection("water_level").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
