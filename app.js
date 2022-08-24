var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const fs = require("firebase-admin")
const serviceAccount = require('./serviceAccountKey.json');

fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();

const {firestore} = require("firebase-admin");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post("/single", async (req,res) => {
    try {
        let iotData = req.body

        iotData = {...iotData, time: firestore.FieldValue.serverTimestamp()}

        const house_ref = db.collection('houses').doc("house1")
        await house_ref.set({total: iotData},{merge: true})
        await house_ref.collection("history").add(iotData)

        const first_device_ref = house_ref.collection("devices").doc("device1")
        await first_device_ref.set(iotData)
        await first_device_ref.collection("history").add(iotData)

        console.log("Data Sent Successfully ")
        return res.send(iotData)
    }catch (e) {
        console.log("Unable to send the data", e)
    }
})

module.exports = app;
