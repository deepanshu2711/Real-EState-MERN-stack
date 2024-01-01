import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/AuthRoutex.js"
import UserRouter from "./routes/UserRoutes.js"
import ListingRouter from "./routes/ListingRoute.js"
import path from "path";
dotenv.config();



mongoose.connect(process.env.MONGO).then(()=>console.log("DB connected"))   //application string

const __dirname = path.resolve();

const app = express();
app.use(express.json());           
app.use(cookieParser());                              //Allow send json to server
app.use("/api/listing",ListingRouter);
app.use("/api/auth" ,AuthRouter);
app.use('/api/user' ,UserRouter);


app.use(express.static(path.join(__dirname,'/client/dist')));


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client' ,'dist' ,'index.html'));
});


app.listen(3000,()=>{
    console.log("Server Running on port 3000..")
});

app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success : false,
        status,
        message
    });
    
})
