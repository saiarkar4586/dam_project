const fs = require('fs');
const path = require('path');
const p = path.join(
        path.dirname(process.mainModule.filename),
        'data',
        'datas.json');
let  express = require('express');
let  router = express.Router();
let  MongoClient = require('mongodb').MongoClient;
let  url = "mongodb+srv://root:root@cluster0-5sh5e.mongodb.net/dan?retryWrites=true&w=majority";

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Page1' });
  MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
    if (err) throw err;
    let  dbo = db.db("dam_project");
    dbo.collection("dam_data").find({}).sort({_id : -1}).toArray(function(err, result) {
        if (err) throw err;
        res.render('index', { title: 'Page1' , datas: result});
        db.close();
    });
  });
});

module.exports = router;
