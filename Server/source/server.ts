import http from 'http';
import bodyParser from 'body-parser';
import express from 'express'; 


const mongoose = require('mongoose');
const router = express();
const generatorRoutes = require('./routes/generator');

//LOG REQUEST
router.use((req, res, next) => { 
    console.log(`REQUEST: [${req.method}] - URL: [${req.url}]`)
    res.on('finish', () => { 
        console.log(`[${req.method}] RESULT STATUS: [${res.statusCode}]`);
    }) 
    next();
});

//MIDDLEWARE
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//RULES 
router.use((req, res, next) => { 
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
    res.header('Access-Control-Allow-Methods', 'GET'); 
    next();
});

//ROUTES
router.use(generatorRoutes); 

//MONGOOSE
//CHECK EMAIL FOR PASSWORD
try {
    mongoose.connect("mongodb+srv://afn1988:"+encodeURIComponent('#####')+"@cluster0.ubwap.mongodb.net/Home") 
} catch (error) {
    console.log("MONGOOSE CONNECTION FAILED [ERROR] ["+error+"]")
}



const httpServer = http.createServer(router); 
httpServer.listen(3021, () => console.log("Server HaasOrc UP on port:3021"));

