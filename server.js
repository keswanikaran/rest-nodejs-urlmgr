var express = require('express'),
    route = require('./routes/urllist');

 
var app = express();
app.configure(function(){
    app.use(express.bodyParser()) ;
});


app.get('/urllist', route.findAll);

app.post('/saveurl',route.createURL);

app.listen(3000);
console.log('Listening on port 3000');