var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("urlmanager");
    db.collection('urlcollection', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'url' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
});

exports.findAll = function(req, res) {

    db.collection('urlcollection', function(err, collection) {

        collection.find().toArray(function(err, items) {

            if (err) throw err;

            res.jsonp(items);

        });

    });
};

exports.createURL = function (req, res) {

    db.collection('urlcollection', function(err, collection) {

        collection.insert(req.body,function(err,result){

             if (err) throw err;

             res.send(result);

         });

    });

};


 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    console.log("Populating sample database...");
    var employees = [
        {"urlname": "www.google.com", "description": "Google''s home page. Your best friend. Click it for any of your queries"},
        {"urlname": "www.twitter.com", "description": "Start tweeting your activities."}
            ];
 
    db.collection('urlcollection', function(err, collection) {
        collection.insert(employees, {safe:true}, function(err, result) {});
    });
 
};