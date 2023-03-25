import mongoose from "mongoose";

 
const connectDB = async ()=> {
try { 
    console.log( "hahah",process.env.MONGO_URI)
    const conn = await mongoose.connect(process.env.MONGO_URI,{
    })
    console.log(`mongoDB connected ${conn.connection.host}`)
} catch (error) {
    console.log(`Error : ${error.message}`)
    process.exit(1);
}
}

export default connectDB
