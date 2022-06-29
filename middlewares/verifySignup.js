const db = require("../model/Model");
const User = db.User;

const verfySingnup = async (req,res,next)=>{
    console.log("hello dsadsa");
    const duplicateUsernameIns= await User.findOne({
        where:{
            userName: req.body.userName
        },
    });
    if(duplicateUsernameIns){
        return res.status(400).json({
            Message:"Cannot sign-up with the username already existed",
        });
    }
    const duplicateEmailIns= await User.findOne({
        where:{
            userName:req.body.email
        },
    });
    if(duplicateEmailIns){
        return res.status(400).json({
            Message:"Cannot sign-up with the email already existed",
        });
    }
    console.log("everything looks good!");
    return next();
};
module.exports= verfySingnup;