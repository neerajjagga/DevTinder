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
    origin : 'http://localhost:5173',
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
app.use('/api/', profileRouter);
app.use('/api/', requestRouter);
app.use('/api/', userRouter);
app.use('/api', cloudinaryRouter);

// error handling middleware
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') {
        res.status(500).send({ message: err.message, stack: err.stack });
    } else {
        res.status(500).send("Something went wrong");
    }
});


connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
})
}).catch((err) => {
    console.log(err, 'Database cannot be connected');
    process.exit(1);
})
