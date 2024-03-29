const { findOneAndUpdate } = require('../models/user');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = function(req,res){
    // res.end('<h1>User profile</h1>');

    // return res.render('profile',{
    //     title:"Home"
    // });

    //rendering users and friends

    User.findById(req.params.id, function(err,user){
        
        return res.render('user_profile',{
            title: "User Profile",
            profile_user: user
        });

    });



    //check if user login cookie is present or not
//     if(req.cookies.user_id){
//         User.findById(req.cookies.user_id,function(err,user){
//             if(err){
//                 console.log('user not found!');
//                 return;
//             }
//             if(user){
//                 return res.render('profile',{
//                     // title:"User Profile",
//                     user:user
//                 });

//             }
//         })

//     }else{
//         return res.redirect('/users/login');
//     }

}

// module.exports.update =  function(req,res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id , req.body,function(err,user){
//             return res.redirect('back');
//         });
//     }else{
//         return res.status(401).send('Unathorised');
//     }
// }

//converting update into async await
module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log('******MulterErorr',err);
                }
                // console.log(req.file);

                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    //check if user already have avatar associated with his/her
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar)); //.. - two steps above
                    }

                    //this is saving the path of the uploaded file into the avatar field in the User
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized..');
        return res.status(401).send('Unathorised');
    }
}

//rendering sign up page
module.exports.signUp = function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_signup',{
        title: "Codeial | Sign Up"
    });
};

//rendering login page
module.exports.login = function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_login',{
        title: "Codeial | Login"
    });
};

//sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error finding user');
            return;
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error signing in by user');
                    return;
                }

                return res.redirect('/users/login');
            });
        }else{
            return res.redirect('back');
        }
    })
};

//get login data session creation
module.exports.createSession = function(req,res){
   
//    //MANUAL AUTHENTICATION
//     //find the user
//     User.findOne({email:req.body.email},function(err,user){
//         if(err){
//             console.log('Error signin in');
//             return;
//         }

//         //handle user found
        
//         if(user){
//             //handle password not match
//             if(user.password!= req.body.password){
//                 return res.redirect('back');
//             }

//             //handle session created
//             res.cookie('user_id',user.id);
//             return res.redirect('/users/profile');


//         }else{

//             //handle user not found

//             return res.redirect('back');

//         }
//     });

    //flash message setup
    req.flash('success','Logged in successfully!');
  
    // USING PASSPORT MIDDLEWARE AUTHENTICATION
    return res.redirect('/');


};

module.exports.destroySession = function(req,res){ 
    req.logout(function(err){
        if(err){
            console.log('Error in signing out');
        }
    });  // inbuilt in passport.js
    

    //flash message setup
    req.flash('success', 'Logged out!');

    return res.redirect('/');

}