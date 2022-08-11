const bcrypt = require('bcrypt');
const { isEmail, isAlpha, isMobilePhone, isInt } = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'please enter a name'],
        validate: [isAlpha, 'please enter a valid name '],
    },
    userpassword: {
        type: 'string',
        required: [true, 'please enter a password'],
        minlength: [6, 'Minimum Password Length is 6 Characters'],
    },
    useremail: {
        type: 'string',
        required: [true, 'please enter a email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'please enter a valid email address '],
    },
    usermobile: {
        type: String,
        required: [true, 'please enter a mobile number'],
        validate: [isMobilePhone, 'please enter a valid mobile number  '],
    },
    usertype: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.userpassword = await bcrypt.hash(this.userpassword, salt);
    next();
});
userSchema.statics.login = async function(useremail, userpassword) {
    //this is refear to the user instance that calls the function.
    const user = await this.findOne({ useremail });
    if (user) {
        const auth = await bcrypt.compare(userpassword, user.userpassword);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

module.exports = mongoose.model('user', userSchema);