const express = require('express');
const {connectDB} = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');
const {rateLimit} = require('express-rate-limit');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const PORT = process.env.PORT || 3000;

// const limiter = rateLimit({
// 	windowMs: 10 * 60 * 1000,
// 	standardHeaders: 'draft-7',
// 	legacyHeaders: false,
// })

// app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials : true,
}));

// added time log middleware
app.use('/', (req, res, next) => {
    const startTime = Date.now(); 
    const date = new Date();

    // Listen for the response to log status code and time taken
    res.on('finish', () => {
        const elapsedTime = Date.now() - startTime;
        console.log(`[${new Date().toLocaleString()}] Response: 
          Status Code: ${res.statusCode} 
          Elapsed Time: ${elapsedTime}ms`);
    });

    next();
});


const {authRouter} = require('./routes/auth');
const {profileRouter} = require('./routes/profile');
const {requestRouter} = require('./routes/request');
const {userRouter} = require('./routes/user');
const {cloudinaryRouter} = require('./routes/cloudinary');

app.use('/api/auth', authRouter);
app.use('/api', profileRouter);
app.use('/api', requestRouter);
app.use('/api', userRouter);
app.use('/api', cloudinaryRouter);

// error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Something went wrong",
    });
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        process.exit(1);
    }
};

startServer();