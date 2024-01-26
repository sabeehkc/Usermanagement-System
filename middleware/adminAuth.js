const isLogin = async(req,res,next)=>{
    try {
        if(req.session.user_id){
            // Admin is logged in, continue to the next middleware or route handler
            next();
        }else{
             // Admin is not logged in, redirect to the login page
            res.redirect('/admin');
        }
        
    } catch (error) {
        console.log(error.message)
    }
};

const isLogout = async(req,res,next)=>{
    try {
        if(req.session.user_id){
             // Admin is already logged in, redirect to the home page
            res.redirect('/admin/home');
        }else{
             // Admin is not logged in, continue to the next middleware or route handler
            next();
        }
        
    } catch (error) {
        console.log(error.message);
    }
    
}

module.exports = {
    isLogin,
    isLogout
}