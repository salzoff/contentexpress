import express from 'express';
import router from './routes/index';

var app = express();

app.use('/', router);

app.listen(3000, () => {
    console.log('Listen on port 3000');
});