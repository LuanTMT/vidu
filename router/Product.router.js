const express = require('express');
const router = express.Router()
const bodyParser = require("body-parser")
const {isAdmin,isMember, verfyToken}= require("../middlewares/authJwt")
const {
  Product,
  sequelize
} = require("../model/Model");

router.post("/v1/products",verfyToken, isAdmin, async (req, res) => {
    try {
      const data = req.body;
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
router.get("/v1/products",verfyToken,isMember, async (req, res) => {
    try {
      const product = await Product.findAll();
      if (product) {
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
  