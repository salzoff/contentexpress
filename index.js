var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('Hier');
});

app.listen(3000);