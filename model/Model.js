const { Sequelize, DataTypes} = require('sequelize');
const config = require('../config/db');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
const User = sequelize.define("user", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate:{    
      max: 25,                
      min: 3,   
    }
  },
  userName:{
    type: DataTypes.STRING,
    validate:{      
        max: 12,                
        min: 3,   
      }
  },
  email: {
    type: DataTypes.STRING,
    validate:{
      isEmail :{
        msg:"wrong email"
      }
    }
  },
  iam_role :{
    type: DataTypes.STRING,
  },
  pwd_hash:{
    type: DataTypes.STRING,
  }
}, {
  timestamps:true,
});
const Categori = sequelize.define("categori",{   
    categoryName:{
        type:DataTypes.STRING,
        validate:{      
            max: 50,                
            min: 3,   
          }
    },   
}, {
    timestamps:true,
  });
const Product = sequelize.define("product",{   
    productName:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{      
            max: 100,                
            min: 3,   
          }
    },   
}, {
    timestamps:true,
  });
  User.hasMany(Product,{
    as:"users",
    foreignKey:{
      name: "userId"}
  
  })
  Categori.hasMany(Product,{
    as:"categoris",
    foreignKey:{
      name: "categoriId"}    
  })  
  Product.belongsTo(User,{ foreignKey:{
    name: "userId"}}
    )
  Product.belongsTo(Categori,{ foreignKey:{
    name: "categoriId"}}
  )

// User.sync({force:true});
// Categori.sync({force:true});
// Product.sync({force:true});


module.exports = {User,Product,Categori, sequelize}