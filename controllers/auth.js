const User = require('../models/User');
const jwt = require('jsonwebtoken');
//handle Error
const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = { username: '', usermobile: '', useremail: '', userpassword: '' };
    //login
    //incorrect email
    if (err.message === "incorrect email") {
        errors.useremail = "that email is not registered";
    }
    //incorrect password
    if (err.message === "incorrect password") {
        errors.userpassword = "that password is incorrect";
    }
    //register
    //duplicate error code
    if (err.code === 11000) {
        errors['useremail'] = 'email already in use';
        return errors;
    }
    // validation errors
    if (err.message.includes('user validation failed')) {
        //we can use properties directly but we need to put them in  ({properties}).
        //or we can use error then error.properties  
        //console.log(err.error.properties);
        // reserr.errors.properties
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
};

const maxAge = 3 * 24 * 60 * 60; //3 days in seconds
const createToken = (id) => {
    //the second parameter is the secret that validate the jwt token.
    return jwt.sign({ id }, "kareem's secret id", { expiresIn: maxAge });
};




module.exports.signup_get = (req, res, next) => {
    res.render('login-reg');
}
module.exports.login_get = (req, res, next) => {
    res.render('login-reg');
}
module.exports.signup_post = async(req, res, next) => {
    const { username, usermobile, useremail, userpassword } = req.body
    try {
        const user = await User.create({ username, usermobile, useremail, userpassword, usertype: false });
        const token = createToken(user._id);
        // res.setHeader("Set-Cookie","logedIn=true") create cookie without cookie parser
        //res.cookie("mario",true,{httpOnly: true,maxAge: maxAge*1000}); create cookie without cookie parser
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        // console.log(err);
        const errors = handleError(err);
        res.status(400).json({ errors })
    }
}
module.exports.login_post = async(req, res, next) => {
    const { useremail, userpassword } = req.body;
    try {
        // res.setHeader("Set-Cookie", "dadas=true");
        const user = await User.login(useremail, userpassword);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
    }
}
module.exports.logout_get = (req, res, next) => {
    res.cookie("jwt", '', { maxAge: 0 });
    console.log("logout");
    res.redirect('/');
}