let express = require('express');
let router = express.Router();

let  MongoClient = require('mongodb').MongoClient;
let  url = "mongodb+srv://root:root@cluster0-5sh5e.mongodb.net/dan?retryWrites=true&w=majority";

/* GET home page. */
router.get('/page2', function(req, res, next) {
  MongoClient.connect(url, { useUnifiedTopology: true },function(err, db) {
    if (err) throw err;
    let  dbo = db.db("dam_project");
    dbo.collection("dam_data").find({}).sort({_id : -1}).toArray(function(err, result) {
        if (err) throw err;
        res.render('page2', { title: 'Page2' , datas: result});
        db.close();
    });
  });
});

module.exports = router;
