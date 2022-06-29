const jwt = require("jsonwebtoken");
const { useReducer } = require("react");
const config= require("../config/auth.config");
const db = require("../model/Model")
const User= db.User;
 
const verfyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"];

    //return 403 error if token not found
    if(!token){
        return res.status(403).json({
            messege:" Notoken provided!",
        });
    }
    
    //verify jwt token
    jwt.verify(token,config.secrect,(err,decoded)=>{
        if(err){
            return res.status(401).json({
                messege:"unauthorized",
            });
        }
        req.userID = decoded.id;
        next();
    });
};

//verify if it's admin permission
const isAdmin = async(req,res,next)=>{
    const id = req.userID
    const user = await User.findOne({where:{id,}});  
    if (user.iam_role === "admin"){       
        return  next();
    }
    return res.status(403).json({
        messege:"forbidden!require admin role",
    });
};
const isModerator= async(req,res,next)=>{
    const id = req.userID
    const user = await User.findOne({where:{id,}});  
    if (user.iam_role === "moderator"){       
        return  next();
    }
    return res.status(403).json({
        messege:"forbidden!require moderator role",
    });
};

//very if it;s member permission
const isMember = async(req,res,next)=>{
    const user = await User.findByPk(req.userID);
    if (user.iam_role === "member"){
        next();
        return;
    }
    return res.status(403).json({
        messege:"forbidden!require member role",
    });
};

const isAdminorMember =  async(req,res,next)=>{
    const user = await User.findByPk(req.userID);
    const iam_role = user.iam_role
    if (iam_role === "admin"||iam_role === "member"){
        next();
        return;
    }
    return res.status(403).json({
        messege:"forbidden!require admin role or member role",
    });
};
const authJwt = {
    verfyToken,
    isAdmin,
    isModerator,
    isMember,
    isAdminorMember,
};
module.exports = authJwt;