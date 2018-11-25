//express hello world
var express = require('express');
var app = express();

// routes
app.get('/', (req, res) =­>
{
   res.send("hello world!");
});
app.get('/stories', function(req, res){
   res.send("stories!");
});

app.listen(5000);
