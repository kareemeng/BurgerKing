const Categories = require('../models/Category');
const Products = require('../models/Product');
const express = require('express');

// get_home  - get_blog - get_about - get_booking - get_contact - get_feature - get_menu - get_single - get_team

const get_home = (req, res, next) => {
    res.render('index', { title: 'Express' });
}
const get_about = (req, res, next) => {
    res.render('about', { title: 'Express' });
}

const get_blog = (req, res, next) => {
    res.render('blog', { title: 'Express' });
}
const get_booking = (req, res, next) => {
    res.render('booking', { title: 'Express' });
}
const get_contact = (req, res, next) => {
    res.render('contact', { title: 'Express' });
}
const get_feature = (req, res, next) => {
    res.render('feature', { title: 'Express' });
}

const get_menu = (req, res, next) => {
    Categories.find({}, (err, Category) => {
        if (err) {
            console.log(err);
            res.redirect('/')
        }
        Products.find({}, (err, Product) => {
            if (err) {
                console.log(err);
                res.redirect('/')
            }
            res.render('menu', { Product, Category })
        })
    })
}

const get_single = (req, res, next) => {
    res.render('single', { title: 'Express' });
}

const get_team = (req, res, next) => {
    res.render('team', { title: 'Express' });
}

module.exports = {
    get_home,
    get_about,
    get_blog,
    get_booking,
    get_contact,
    get_feature,
    get_menu,
    get_single,
    get_team

}