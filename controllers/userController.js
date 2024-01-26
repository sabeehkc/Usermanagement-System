const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
};

const loadRegister = async(req,res)=>{
    try{

        res.render('register',{message:"",title:"Signup page"});

    }catch (error){
        console.log(error.message);
    }
};

const insertUser = async(req,res)=>{
    try{
    const spassword =  await securePassword(req.body.password);
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:spassword,
            mobile:req.body.mno,
            is_admin:0
            
        });
        const userDate = await user.save();

        if(userDate){
            res.render('register',{ message:"Your registration has been successfully.."});
        }else{
            res.render('register',{ message:"Your registration has been failed!!"});
        }

    }catch(error){ 
        console.log(error.message);
    }
};

//login user methods started

const loginLoad = async(req, res)=>{
   try {
    if(req.session.user_id){
        res.redirect('/home')
    }else{
        res.render('login',{title:"Login Page"});
    }
   
   } catch (error) {
        console.log(error.message);
   } 
};

const verifyLogin = async(req,res)=>{
    try {
        const email = req.body.email;
        const password= req.body.password;

     const userData = await User.findOne({email:email, is_admin: 0});

     if(userData){

     const passwordMatch = await bcrypt.compare(password,userData.password);
        if (passwordMatch) {
            if(userData.is_verified === 0 ){
                res.render('login',{message:"Email or password is incorrect!"});
            }else{
                req.session.user_id = userData._id;
                res.redirect('/home');
            }
        
        } else {
             res.render('login',{message:"Email and password is incorrect!"});
        }

     }else{
        res.render('login',{message:"Email and password is incorrect!"});
     }
        
    } catch (error) {
        console.log(error.message);
    }
};

// Home page
const loadHome = async(req,res)=>{
    try {
        if(req.session.user_id){
            res.render('home',{title:"Home Page"})
        }else{
            res.redirect('/')
        }
        
    } catch (error) {
        console.log(error.message);
    }
};

const userLogout = async(req,res)=>{
    try {
        req.session.user_id = null;
        res.redirect('/');
        
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout
};