const express = require("express");
const admin_route = express();

//session
const session = require("express-session");
const config = require("../confiq/config");
admin_route.use(session({secret:config.sessionSecret}));

//body_parser
const bodyParser = require("body-parser");
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extented:true}));

//set view engine
admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');

const auth = require("../middleware/adminAuth");

// const nocashe = require('nocache');

// admin_route.use(nocashe())

const adminController = require("../controllers/adminController");

//admin route
admin_route.get('/',adminController.loadlogin)

//admin post route
admin_route.post('/',auth.isLogout,adminController.verifyLogin);

//admin home
admin_route.get('/home',auth.isLogin,adminController.loadDashboard);

//admin logout
admin_route.get('/logout',auth.isLogin,adminController.logout);

//admin add new user
admin_route.get('/new-user',auth.isLogin,adminController.newUserLoad);
admin_route.post('/new-user',adminController.addUser);

//any type goign admin loginpage
admin_route.get('*',function(req,res){
    res.redirect('/admin');
})

module.exports = admin_route;