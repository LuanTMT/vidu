const express = require('express');
const app = express.Router()

const verifySignup= require("../middlewares/verifySignup");
const controller =require("../controler/auth.controler");

// module.exports = (app)=>{
    //set responese header
    app.use((req,res,next)=>{
        res.header (
            "Access-Control-Allow-Header",
            "x-access-token,Origin,Content-Type,Accept"
        );
        next();
    });
    //,verifySignup
    app.post("/v1/auth/signup",verifySignup,controller.signup);
    app.post("/v1/auth/signin",controller.signin);
// };
module.exports = app