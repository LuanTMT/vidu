const express = require('express');
const { verfyToken, isAdmin } = require('../middlewares/authJwt');
const router = express.Router()
const {
  User,
  sequelize
} = require("../model/Model");


//read all user
router.get("/v1/users",verfyToken,isAdmin, async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
      res.status(200);
      res.json(users);
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