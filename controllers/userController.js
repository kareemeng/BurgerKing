const BookingTable = require('../models/Booking');

const handleError = (err) => {
    console.log("err message:", err.message, err.code);
    let errors = { date: '', start: '', end: '', tableNo: '', guestNo: '' };
    //login
    //incorrect email
    if (err.message === "time not available") {
        errors.start = "time is not available";
        errors.end = "time is not available";
    }
    if (err.message === "date not available") {
        errors.date = "date is not available";
    }
    if (err.message === "table not available") {
        errors.tableNo = "table is not available";
    }
    // //incorrect password
    // if (err.message === "incorrect password") {
    //     errors.userpassword = "that password is incorrect";
    // }
    // validation errors
    if (err.message.includes('Booking validation failed')) {
        //we can use properties directly but we need to put them in  ({properties}).
        //or we can use error then error.properties  
        console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
            //console.log(properties);
        })
    }
    return errors;
};


exports.post_book = async(req, res, next) => {

    const { date, start, end, guestNo, tableNo, userinfo } = req.body;
    const re = BookingTable.validatebooking(date, start, end, guestNo, tableNo, userinfo).then(async(result) => {
        if (result) {
            const booking = await BookingTable.create({ date, start, end, guestNo, tableNo, userinfo });
            res.status(201).json({ booking: booking._id });
        }
    }).catch((err) => {
        const errors = handleError(err);
        res.status(400).json({ errors })

    });
}
exports.post_creat = async(req, res, next) => {
    const { date, start, end, tableNo } = req.body;
    try {
        const booking = await BookingTable.create({ date, start, end, guestNo, tableNo, userinfo });
        res.status(201).json({ booking: booking._id });
    } catch (err) {
        // console.log(err);
        const errors = handleError(err);
        res.status(400).json({ errors })
    }
}