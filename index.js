const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var cors = require('cors');

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

//Allow Cors
app.use(cors())
// app.use(function (req,res,next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","Origin, X-Request-With,Content-Type,Accept");
//     next();
// })

//Route Middleware
app.use('/api/auth',authRoute);
app.use('/api/posts',postRoute)

//App port listener
app.listen(8888,()=>console.log('Server is running'));
