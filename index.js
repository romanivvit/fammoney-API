const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post')

//Connect env to connect DB
dotenv.config();

// Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
    ()=> console.log("Connected to DB")
)

//Body parser(Middleware)
app.use(express.json());

//Route Middleware
app.use('/api/use',authRoute);
app.use('/api/posts',postRoute)

//App port listener
app.listen(3000,()=>console.log('Server is running'));
