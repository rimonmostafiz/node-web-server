const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
       if  (err) {
           console.log('Unable to save log to file.')
       }
    });
    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('Hello Express!');
    res.render('home.hbs', {
        pageTitle: 'Node Web App',
        welcomeMessage: 'Welcome to Express!!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
   res.send({
       errorMessage: 'Unable to handle request'
   })
});

app.listen(3000, () => {
    console.log('Server is up at port 3000');
});
