const express = require("express");
const userRouter = require("./router/User.router");
const productRouter = require("./router/Product.router");
const categoriRouter = require("./router/categories.router");
const authen = require("./router/auth.router");
const bodyParser = require("body-parser")

const app = express()
const port = 3000;
// ADD THIS
var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(express.static("public/images"));
app.use("/api", userRouter);
app.use("/api",productRouter);
app.use("/api",categoriRouter);
app.use("/api",authen);

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
})
// const readline = require("readline");
// const rl = readline.createInterface({
//     input : process.stdin,
//     output: process.stdout
// });
// let query = "waht is yas";
// rl.question(query,(as)=>{
//     console.log((`helo ${as}~`));
//     rl.close();
// })
// console.log(process.argv);