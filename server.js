const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/family-time-db", ()=>{
    console.log("Connected to Database")
})

app.get('/',(req, res)=>{ 
res.send("Welcome")
   })

   app.use((err, req, res, next)=>{
res.send({errMsg:err.message})
   })

app.listen(9000, console.log("Server running on port 9000"))