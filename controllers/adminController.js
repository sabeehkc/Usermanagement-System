const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const randomstring = require('randomstring');

const securePassword = async(password)=>{
    try{
        const passwordHash =  bcrypt.hash(password,10);
        return passwordHash;
        
    }catch (error){
        console.log(error.message);
    }
}

//admin login page
const loadlogin = async(req,res)=>{
    try {
        
        res.render('adlogin',{title:"Admin page"});

    } catch (error) {
        console.log(error.message)
    }
}

//verify admin email and password
const verifyLogin = async(req,res)=>{
    try {

        const email = req.body.email;
        const password = req.body.password;

       const userData = await User.findOne({email:email});
       if(userData){

           const passwordMatch = await bcrypt.compare(password,userData.password);

           if(passwordMatch){

                if(userData.is_admin === 0 ){
                    res.render('adlogin',{message: "Email and Password in incorrect"})
                }else{
                    req.session.user_id = userData._id;
                    res.redirect("/admin/home");
                }


           }else{
            res.render('adlogin',{message: "Email and Password in incorrect"});
           }

       }else{
            res.render('adlogin',{message: "Email and Password in incorrect"});
       } 

    } catch (error) {
        console.log(error.message);
    }
}

//admin home page
const loadDashboard = async(req,res)=>{
    try {
        const usersData = await User.find({is_admin:0});
        res.render('adhome',{users:usersData,title: "Admin Home"});
        
    } catch (error) {
        console.log(error.message);
    }
}

//admin Logout 

const logout = async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/admin');
        
    } catch (error) {
        console.log(error.message);
    }
}

//add new user work start 
const newUserLoad = async(req,res)=>{
    try {
        res.render('new-user',{message: "",title:"Add New User"})
    } catch (error) {
        console.log(error.message);
    }
}

const addUser  = async(req,res)=>{
    try {
       const name = req.body.name;
       const email = req.body.email;
       const mno = req.body.mno;
       const password = randomstring.generate(8);
       
        const spassword = await securePassword(password);

        const user =  new User({
            name:name,
            email:email,
            password:spassword,
            mobile:mno,
            is_admin:0
        });

        const userData = await user.save();
        if (userData) {

            res.redirect('/admin/home')
        } else {
            res.render('new-user',{message:"Something wrong"})
        }

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    loadlogin,
    verifyLogin,
    loadDashboard,
    logout,
    newUserLoad,
    addUser
}