let express = require('express');
let app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'testApp';
let db;

const findDocuments = function (db, callback) {
    const collection = db.collection('strings');
    collection.find({}).toArray(function (err, docs) {
        callback(docs);
    });
};

MongoClient.connect(url, function (err, client) {
    console.log("Connected successfully to server");
    db = client.db(dbName);
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/strings', function (req, res) {
    findDocuments(db, function (result) {
        res.json(result);
    });

});

app.listen(3000, function () {
    console.log('listening on port 3000!');
});
