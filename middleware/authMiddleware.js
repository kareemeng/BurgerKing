const { redirect } = require('express/lib/response');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    //check if token is existing & valid.
    if (!token) {
        res.redirect("/auth/account");
    } else {
        jwt.verify(token, "kareem's secret id", (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect("/auth/account");
            } else {
                console.log(decodedToken);
                next();
            }
        });
    }
};
//check the authorized user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    //check if token is existing & valid. 
    if (!token) {
        res.locals.currentUser = null;
        next();
    } else {
        jwt.verify(token, "kareem's secret id", async(err, decodedToken) => {
            if (err) {
                console.log(err);
                res.locals.currentUser = null;
                next();
            } else {
                console.log(decodedToken);
                const currentUser = await User.findById(decodedToken.id);
                res.locals.currentUser = currentUser;
                next();
            }
        });
    }
};
//admin auth
const requireAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    //check if token is existing & valid.
    if (!token) {
        console.log("token")
        res.redirect("/");
    } else {
        jwt.verify(token, "kareem's secret id", async(err, decodedToken) => {
            if (err) {
                console.log(err);
                console.log("not verifyed")
                res.redirect("/");
            } else {
                const CurrentUser = await User.findById(decodedToken.id);
                if (!CurrentUser.usertype) {
                    console.log("not admin")
                    res.redirect("/");
                }
                next();
            }
        });
    }
};
module.exports = { requireAuth, checkUser, requireAdmin };