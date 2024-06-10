const express = require("express");
const app = express();
const USER = require("./Models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cors  = require('cors')
const { default: mongoose } = require("mongoose");
JWT_SECRET='qwertyuiop'
app.use(express.json());
app.use(cors())
//Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://suarim:suarim@cluster0.irblu3a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("connected"));

const loggedin=(req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(422).json({err:"not logged in"})
    }
    const {id} = jwt.verify(authorization,JWT_SECRET)
    req.user=id
    next()
}


//SignUp Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  if (!email || !password) {
    return res.status(422).json({ error: "Enter all fields" });
  }
  const isemail = await USER.findOne({ email });
  if (isemail) {
    return res.json({ error: "already existing user" });
  }
  hashpass = await bcrypt.hash(password, 14);
  const data = await new USER({
    email,
    password: hashpass,
  }).save();
  res.status(201).json(data);
});

//SignIn Route
app.post('/signin',async (req,res)=>{
    const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ err: "Enter all fields" });
  }
  const isemail = await USER.findOne({ email });
  if (isemail) {
    pass = isemail.password
    match = bcrypt.compare(password,pass)
    if(match){
        const token =   jwt.sign({id:isemail._id},JWT_SECRET)
        res.status(200).json({token})
    }
    else{
        res.status(404).json({err:"could not be found"})
    }
  }
})

const path = require('path');
    app.use(express.static(path.resolve(__dirname,'client','build')))
    app.get('/',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })

app.listen(5000, () => {
  console.log("Listening on port 5000....");
});
