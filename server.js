require('dotenv').config()
const express = require('express');
const expressLayout = require('express-ejs-layouts')
const customerRoute = require('./server/routes/customer.js');
const ConnectDB = require('./server/config/db.js');
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const app = express();
const port = process.env.PORT || 3001
ConnectDB()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

// Static Files 
app.use((express.static('public')));

// session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 100 * 60 * 60 * 24 * 7  //1w 
    }

}))

// fash message
app.use(flash({ sessionKeyName: 'fashMessage' }))

// Templeting Engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// Routes
app.use('/', customerRoute)
app.get((req, res) => {
    try {
        res.render(404).render('404')
    } catch (error) {
        console.log(error);
    }

})

app.listen(port, () => {
    console.log(`Server is Listeing on port ${port}`);
})
