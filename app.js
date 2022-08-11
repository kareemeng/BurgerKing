var createError = require('http-errors');
var express = require('express');
//var bcrypt = require('bcrypt');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
// const flash = require('connect-flash');
const { checkUser } = require('./middleware/authMiddleware');
// var multer = require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRoutes = require('./routes/auth');
const adminRouter = require('./routes/admin');




var app = express();
const dbURI = 'mongodb://localhost:27017/BurgerKing'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) console.log(err);
        else console.log('BD is conected')
    })
    // view engine setup

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString() + '-' + file.originalname);
//     }
// });
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'lib')));
app.use(express.static(path.join(__dirname, 'mail')));
// app.use(multer({ storage: fileStorage }).single('Categoryimge'));

const MONGODB_URI = dbURI;

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
const csrfProtection = csrf();

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
// app.use(csrfProtection);
// app.use(flash());
app.get('*', checkUser)
app.use('/', indexRouter);
app.use('/auth', authRoutes);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;