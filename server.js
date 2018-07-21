const express = require('express');

var exphbs = require('express-handlebars');
var hbs = require('hbs');
const fs = require('fs');



var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');



hbs.registerHelper('getCurrentYear', ()=> {
   // return 'test';
   return new Date().getFullYear();
}); 



//app.use(express.static(__dirname+ 'public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;


  console.log(log);
  fs.appendFile('server.log', log + '\n');

  next();

});


app.use((req, res, next) =>{    //이 밑으로 안넘어가네 
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public')); //middleWare?

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  
  res.render('home.hbs', {
    pageTitle: 'home PPage',
    welcome: 'This is Web King',
    //currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About PPage',
    //currentYear: new Date().getFullYear()
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(8081, () => {
  console.log('Server is up on port 8081');
});
