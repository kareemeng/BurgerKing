var Category = require('../models/Category');
var Product = require('../models/Product');
const Booking = require('../models/Booking');
const User = require('../models/User');
admin = function(req, res, next) {
    Category.find({}, (error, resultc) => {
        if (error) {
            console.log(error);
            res.redirect('/')
        }
        Product.find({}, (error, result) => {
            if (error) {
                console.log(error);
                res.redirect('/')
            }
            console.log(result);
            res.render('menu_admin', { Product: result, Category: resultc })
        })
    })

};

reservation_post = async function(req, res, next) {
    var datebook = req.body.date_1;
    var ss = datebook.split("-");
    //remove the ZERO on the left side of the date
    if (ss[1] < "10") {
        ss[1] = ss[1][1];
    }
    if (ss[2] < "10") {
        ss[2] = ss[2][1];
    }
    datebook = `${ss[0]}-${ss[1]}-${ss[2]}`;
    console.log("date", datebook);
    const result = await Booking.find({ date: datebook });
    var users = [];
    for (var i = 0; i < result.length; i++) {
        //for some reason there is additional space in result[i].userinfo so we will trim it
        const info = await User.findById(result[i].userinfo.trim());
        users[i] = info;
    }
    //console.log("users", users);
    //console.log("result", result);
    res.render('admin-reservation', { Book: result, users });
};
reservation = function(req, res, next) {


    res.render('admin-reservation', { Book: "" });

};

del_category_post = function(req, res, next) {
    const id = req.body.catId;
    Product.deleteMany({ Productccategory: req.body.catname }, (error, result) => {})
    Category.deleteOne({ _id: id }, (error, result) => {
        if (error) {
            console.log(error);
            res.redirect('/');
        }
        res.redirect('/admin');
    })
};

add_category_get = function(req, res, next) {
    res.render('add_category', { pageTitle: 'Add Category', editing: false });
};

update_category_get = function(req, res, next) {
    const editMode = req.query.edit;
    const id = req.params.id;
    Category.findOne({ _id: id }, (error, result) => {
        console.log(result);
        res.render('add_category', { pageTitle: 'Edit Category', editing: editMode, category: result });
    });

};

update_product_get = function(req, res, next) {
    var id = req.params.id;
    var cat;
    Category.find({}, (error, resultc) => {
        cat = resultc;
    });
    Product.findOne({ _id: id }, (error, result) => {
        res.render('updateproduct', { pro: result, Category: cat });
    })
};

add_product_get = function(req, res, next) {
    Category.find({}, (error, resultc) => {
        res.render('add_product', { Category: resultc });
    });
};

add_category_post = function(req, res, next) {

    const category = new Category({
        Categoryname: req.body.Categoryname,
        Categoryimge: req.body.Categoryimge
    });
    category.save((error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(result);
        res.redirect('/admin');
    })
};

add_product_post = function(req, res, next) {

    const product = new Product({
        Productname: req.body.Productname,
        Productprice: req.body.Productprice,
        Productdescription: req.body.Productdiscription,
        Productimge: req.body.Productimge,
        Productccategory: req.body.Productccategory

    });
    console.log(req.body.Productimge)

    product.save((error, result) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(result);
        res.redirect('/admin');
    })
};

update_category_post = function(req, res, next) {
    const id = req.body.catid;
    //collect data
    const userupdate = {
            Categoryname: req.body.Categoryname,
            Categoryimge: req.body.Categoryimge
        }
        //update
    Category.findOne({ _id: id }).then((result) => {
        //console.log("result","we are here",result)
        Product.updateMany({ Productccategory: result.Categoryname }, { "Productccategory": userupdate.Categoryname }).then(() => {
            console.log("updated", "we are here", result.Categoryname)
        }).catch((err) => {
            console.log("update err", err);
        })

    });
    Category.updateOne({ _id: id }, userupdate).then(() => {
        res.redirect('/admin');
    })
};


update_product_post = function(req, res, next) {
    const id = req.body.proID;
    const userupdate = {
        Productname: req.body.Productname,
        Productprice: req.body.Productprice,
        Productdescription: req.body.Productdiscription,
        Productimge: req.body.Productimge,
        Productccategory: req.body.Productcategory
    }
    Product.updateOne({ _id: id }, userupdate).then(() => {
        res.redirect('/admin');
    })
};


del_product_post = function(req, res, next) {
    const id = req.body.proID;

    Product.deleteOne({ _id: id }, (error, result) => {
        if (error) {
            console.log(error);
            res.redirect('/');
        }
        res.redirect('/admin');
    })
};


module.exports = {
    reservation_post,
    admin,
    reservation,
    del_category_post,
    add_category_get,
    update_category_get,
    add_product_get,
    add_category_post,
    add_product_post,
    update_category_post,
    del_product_post,
    update_product_get,
    update_product_post
}