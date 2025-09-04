import {config} from 'dotenv';
config({ path: "./config.env" }); 
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connection} from "./database/dbConnection.js";
import { errorMiddleware } from './middlewares/error.js';
import userRouter from './routes/userRouter.js';
import {removeUnverifiedAccounts} from "./automation/removeUnverifiedAccounts.js"


export const app = express();
 

app.use(cors({               //iska use hm middleware aur frontend aur backend ko coonect krne ke liye use krenge     
    origin: [process.env.FRONTEND_URL],   //iska use hum saare frontend to more than age on frontend hai to iss specific backend se connect krne ke liye krte hai 
    methods: ["GET", "POST", "PUT", "DELETE"],//iska use hum saare methods ko allow krne ke liye use krenge
    credentials: true, // iska use hum cookies ko allow krne ke liye use krenge
}));


app.use(cookieParser());
app.use(express.json()); //iska use hum isliye krte hai ki jo bhi data hm postman se send krenge wo json format mei send ho sake
app.use(express.urlencoded({ extended: true }));//iska use hum isliye krte hai ki jo bhi data hm postman se send krenge wo url encoded format mei send ho sake


app.use("/api/v1/user", userRouter); // Registering the user router with the base path /api/v1

http://localhost:4000/api/v1/user/register


removeUnverifiedAccounts()
connection();

//import error
app.use(errorMiddleware);
