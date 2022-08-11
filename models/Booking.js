var mongoose = require('mongoose');
const BookingSchema = mongoose.Schema({
    tableNo: {
        type: Number,
        required: [true, 'please enter a table Number']
    },
    date: {
        type: String,
        required: [true, 'please enter a date']

    },
    start: {
        type: Number,
        required: [true, 'please enter a start time']
    },
    end: {
        type: Number,
        required: [true, 'please enter a end time']
    },
    guestNo: {
        type: Number,
        required: [true, 'please enter the number of the guests']
    },
    userinfo: {
        type: String,
        required: true
    }
});
// BookingSchema.statics.reserve = async function(date) {
//     const tablecheck = await this.find({ date });
//     return tablecheck;

// };
const cmptime = function(date1, date2) {
    date1 = date1.split("-");
    date2 = date2.split("-");
    if (parseInt(date1[0]) > parseInt(date2[0]) || parseInt(date1[1]) > parseInt(date2[1]) || parseInt(date1[2]) > parseInt(date2[2])) {
        // console.log('Invalid', parseInt(date1[0]), parseInt(date2[0]), parseInt(date1[1]), parseInt(date2[1]), parseInt(date1[2]), parseInt(date2[2]))
        return -1;
    } else {

        return 1;
    }
}
BookingSchema.statics.validatebooking = async function(date, start, end, guestNo, tableNo, userinfo) {
    //this is refear to the user instance that calls the function.
    var today = new Date();
    var todaydate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    if (!date || !start || !end || !guestNo || !tableNo || !userinfo) {
        return true;
    }
    if (cmptime(todaydate, date) < 0) {
        console.log('Invalid date', date)
        console.log('Invalid date', "currnt", todaydate)
        throw Error('date not available');
    }
    console.log('date is correct', todaydate, "<", date);
    if (parseInt(start) >= parseInt(end)) {
        console.log('Invalid start or end', start, end)
        throw Error('time not available');
    }
    console.log("datevalue", date);
    const tablecheck = await this.find({ tableNo, date });
    for (let i = 0; i < tablecheck.length; i++) {
        if ((start >= tablecheck[i].start && start < tablecheck[i].end)) {
            throw Error('table not available');
        }
        if ((end > tablecheck[i].start && end <= tablecheck[i].end)) {
            throw Error('table not available');
        }
        if ((start <= tablecheck[i].start && end >= tablecheck[i].end)) {
            throw Error('table not available');
        }
    }
    return true;

}

module.exports = mongoose.model('Booking', BookingSchema);