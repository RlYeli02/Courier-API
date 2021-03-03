const express = require('express');
const app = express();
var mongoClient = require("mongodb").MongoClient;
const CONNECTION_URL =  require ('./config')
const packageRouter = require ('./routes/router')
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyparser.json({ limit: "15mb", extended: true}));
app.use(bodyparser.urlencoded({limit: "15mb", extended: true}));
app.use('/packages',packageRouter);
const PORT = process.env.PORT || 3001;

mongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("connected"))
    .then(()=> app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`)))
    .catch((err)=>console.log(err))

