const express = require('express')
const mongoose = require('mongoose')
const path =require('path')
const port = 3077

const app = express()
app.use(express.static(__dirname))

app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://127.0.0.1:27017/students')
const db = mongoose.connection

db.once('open',()=>{
    console.log("mongodb connection succesfull")
})

const userSchema =new mongoose.Schema({
    reg_no : String,
    name : String,
    email : String,
    branch : String
})

const Users = mongoose.model("data",userSchema) 


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/post',async(req,res)=>{
    const { reg_no,name,email,branch}=req.body
    const user = new Users({
        reg_no,
        name,
        email,
        branch
    })
    await user.save()
    console.log(user)
    res.send("form submitted")
})

app.listen(port,()=>{
    console.log("server started...")
})