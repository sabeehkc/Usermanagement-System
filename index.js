const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system");

const express = require("express");
const app = express();
const nocache = require("nocache")

app.use(express.static('public'))

app.use(nocache())

// for User route
const userRoute = require('./routes/userRoute');
app.use('/',userRoute);

// for Admin route
const adminRoute = require('./routes/adminRoute');
app.use('/admin',adminRoute);

//port  
const PORT = process.env.PORT || 5001; 
 

app.listen(PORT,()=>{console.log(`Server starting on http://localhost:${PORT}`)})
