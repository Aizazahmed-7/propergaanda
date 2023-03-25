import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import UserRoutes from './routes/UserRoutes.js';
import PostRoutes from './routes/PostRoutes.js';
import ImageRoutes from './routes/imageRoutes.js';
import {notFound,errorHandler} from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cloudinary from 'cloudinary';



dotenv.config();

console.log("DB VALUE: ",process.env.PASSWORD)

connectDB();

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
    });


const app = express();
app.use(cookieParser());
app.use(express.json());

app.use('/api/posts',PostRoutes)
app.use('/api/user',UserRoutes)
app.use('/api/cloudinary',ImageRoutes)

const __dirname = path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT || 5000}`);
});