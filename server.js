require('dotenv').config();
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')
//just to show a demo how you can set any key value thing with the set function.
// app.set('title',"mera app");
// console.log(app.get("title"));

app.set('view engine',"ejs")
app.set('views',__dirname + '/views');
app.set('layout','layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use('/',indexRouter);

//database connection
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser : true,useUnifiedTopology: true})

const db = mongoose.connection;
db.on('error',(err)=>{console.error(err)});
db.once('open',()=>{console.log("connected to database")});

//server connection
app.listen(process.env.PORT || 3001,()=>{
    console.log("sever started...")
});