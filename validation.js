//Validation
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = (data) =>{
    const schema = {
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().min(6).max(100).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    }
    return Joi.validate(data,schema);
}

//Login validation
const loginValidation = (data) =>{
    const schema = {
        email: Joi.string().min(6).max(100).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    }
    return Joi.validate(data.body,schema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
