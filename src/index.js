import express from 'express';
import router from './routes/index';
import config from './config';
var app = express();

app.use('/', router);

app.listen(config.port || 3000, () => {
    console.log(`Listen on port ${config.port}`);
});