const express = require('express');
const router = express.Router()
const {isAdmin,isAdminorMember,isModerator,isMember, verfyToken}= require("../middlewares/authJwt")
const {
  Categori,
  sequelize
} = require("../model/Model");

router.post("/",verfyToken,isAdmin,async (req, res) => {
    try {
      const data = req.body;
      if (data) {
        const categori = await Categori.create(data);
        res.status(200);
        res.json(categori);
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
module.exports = router;