import mongoose from 'mongoose';


export const connection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "MERN_AUTHENTICATION", // iska use hm database ka naam set krne ke liye krte hai
    }).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.error(`Database connection failed:, ${err}`);
    });
}