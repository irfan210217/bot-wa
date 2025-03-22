import express from 'express';
import router from './src/routes/getProfile.js';
// import { start } from './src/controller/botStart.js';

const app = express();

app.use(express.json());
app.use(router);

app.use('/', (req, res) => {
    res.send({
        message : "Not Found",
        code : 404 
    });
})
app.listen(5000, () => {
    // start('Server Running');
    console.log('server running');
    
});