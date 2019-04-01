import 'dotenv/config';
console.log(process.env);
import express from 'express';
import router from './routes/index';
import config from './config';
import cors from 'cors';

var app = express();

app.use(cors());
app.use('/', router);

app.listen(config.port || 3000, () => {
    console.log(`Listen on port ${config.port}`);
});
