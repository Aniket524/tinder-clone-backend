import express from 'express'
import mongoose from 'mongoose'
import dbCards from './dbCards.js';
import cors from 'cors';
//APP CONFIG
const app = express();
const port = process.env.PORT || 3001

//MIDDLEWARE
app.use(express.json())
app.use(cors())

//DB CONFIG
mongoose.connect("mongodb+srv://Aniket524:R97PZ1PCT3ihc4TZ@cluster0.pxoda.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("database connected successfully"))
.catch((error)=>console.log(error))

//API ENDPOINT
app.get("/",(req,res)=>{res.send("home")})
app.post("/tinder/cards",async(req,res)=>{
    try {
        const card=await dbCards.create({name:req.body.name,imgUrl:req.body.url})
        res.status(200).json(card)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
app.get("/tinder/cards",async(req,res)=>{
    try {
        const data = await dbCards.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//LISTENER
app.listen(port,()=>console.log(`server is running on port ${port}`))