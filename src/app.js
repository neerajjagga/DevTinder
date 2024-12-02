const express = require('express');
const {connectDB} = require('./config/database');
const app = express();
const cookieParser = require('cookie-parser');
const {rateLimit} = require('express-rate-limit');
const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// added time log middleware
app.use('/', (req, res, next) => {
    const date = new Date();
    console.log(`Request received for ${req.url} and method is ${req.method} at : ` + date.toLocaleString());
    next();
})

const {authRouter} = require('./routes/auth');
const {profileRouter} = require('./routes/profile');
const {requestRouter} = require('./routes/request');
const {userRouter} = require('./routes/user');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);


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
