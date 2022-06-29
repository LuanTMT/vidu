const express = require('express');
const router = express.Router()
const bodyParser = require("body-parser")
const {isAdmin,isMember, verfyToken}= require("../middlewares/authJwt")
const {
  Product,
  sequelize,
  User
} = require("../model/Model");

router.post("/v1/users/:id/products",verfyToken, isMember, async (req, res) => {
    try {    
      const {id}= req.params;
      const {productName}= req.body
      const data = {        
        productName : productName,
        userId : id
      };
      if (data) {
        const product = await Product.create(data);
        res.status(200);
        res.json(product);
      }
      else{
        res.status(404);
        res.json({ message: "Error: server don't found input data " });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: "server got error" });
    }    
  });
router.get("/v1/users/:id/products",verfyToken,isMember, async (req, res) => {
    try {
      const {id}= req.params;
      const user = await User.findOne({where:{
        id,
      }});
      const product = await Product.findAll({where:{
        userId : id,
      }})
      const i = {...product,...user};
      if (user) {
        res.status(200);
        res.json(product);
      }
      else{
        res.status(404);
        res.json({ message: "Error: server don't found data " });
      }
    } catch (error) {
      res.status(500);
      res.json({ message: "server got error" });
    } 
  });
module.exports = router;
  