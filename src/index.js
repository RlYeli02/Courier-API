const express = require('express');
const app = express();
var mongoose = require("mongoose")
const CONNECTION_URL =  require ('./config')
const userRouter = require ('./routes/userController')
const packagesRouter = require ('./routes/PackageController')
const bodyparser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyparser.json({ limit: "15mb", extended: true}));
app.use(bodyparser.urlencoded({limit: "15mb", extended: true}));

app.use('/users',userRouter);
app.use('/packages',packagesRouter);

const PORT = process.env.PORT || 3001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log("connected"))
    .then(()=> app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`)))
    .catch((err)=>console.log(err))

mongoose.set('bufferCommands', false);