const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {

    var now = new Date().toString();
    var log = now + " " + req.method + " " + req.url;

    console.log();
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            //console.log('Error_: unable to append to server.log');
        }
        next();

    });

});

app.use((req, res, next) => {

    res.render('maintance.hbs');
    //console.log('Error_: unable to append to server.log');


});


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('It', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello express!</h1>');
    res.render('Home.hbs', {
        title: 'HomePage',
        pageTitle: 'Home Page',
        message: 'Welcome to homepage:..',
        //currentYear: new Date().getFullYear()
        //
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        //currentYear: new Date().getFullYear() 
    });
});

app.get('/error', (req, res) => {
    res.send('Error unable to handle the request');
});
app.listen(3000, () => {
    console.log('Server is up port:3000');
});
