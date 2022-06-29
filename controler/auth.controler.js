const md5 = require("md5");
const jwt = require("jsonwebtoken");
const db = require("../model/Model")
const authConfig = require("../config/auth.config");
const User = db.User


exports.signup = async(req,res)=>{
    const {
        fullName,
        userName,
        email,
        password,
        iam_role,
    }= req.body
    try {
        const createData = {
            fullName,
            userName,
            email,
            pwd_hash : md5(password),
            iam_role,
            pwd_algorithm :"md5",
        };

        //execute create jew user in database
        await User.create(createData);       
        return res.status(201).json(createData);    
    } catch(error){
        return res.status(500).json({
            message:error.message,
            // "server is getting error when creating new User account"
        });
    }
};
exports.signin = async (req,res)=>{
    const{userName,password}=req.body;

    //check username in database
    const foundUser = await User.findOne({where:{
        userName,
    }});
    if(!foundUser){
        return res.status(404).json({
            message:"invalid username",
        });
    }
    if(md5(password) !== foundUser.pwd_hash){
        return res.status(404).json({
            message:"invalid password",
        });
    }

    //generate token
    const token = jwt.sign({id:foundUser.id},
        authConfig.secrect,{expiresIn:86400,});

    return res.status(200).json({
        id: foundUser.id,
        userName: foundUser.userName,
        email:foundUser.email,
        accessToken : token
    });
};
// const signup = async (req,res) => {
//     const{userName,pwd}= req.body;
// }
// const signin = (req,res) => {
   
// }
// module.exports ={signup , signin}