const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

//Register post
router.post('/register', async (req,res) => {

    //Validation before we make a user(Always pass req.body)
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if the user is already in DB
    const emailExist = await User.findOne({
        email: req.body.email
    })
    if(emailExist) return res.status(400).send('Email already exist');

    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });
    try {
        //Saving the request data to DB
        const savedUser = await user.save();
        const token = jwt.sign({
            id: savedUser._id
        },process.env.TOKEN_SECRET)

        res.send({
            user: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,
            jwtToken: token
        })
    }catch (e) {
        res.status(400).send(e)
    }
})


//Login post
router.post('/login',async (req,res)=>{

    //Validation before we make a user(Always pass req.body)
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if the email exists in DB
    const userInDB = await User.findOne({
        email: req.body.email
    })
    if(!userInDB) return res.status(400).send('Email or password is wrong');

    //Check if the password is correct
    const validPass = await bcrypt.compare(req.body.password, userInDB.password)
    if(!validPass) return res.status(400).send('Email or password is wrong');

    //Set a jwt token
    const token = jwt.sign({
        id: userInDB._id
    },process.env.TOKEN_SECRET)

    res.header('JWT-Token',token).send(token);
})

module.exports = router;
