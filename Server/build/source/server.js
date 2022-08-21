"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const mongoose = require('mongoose');
const router = (0, express_1.default)();
const generatorRoutes = require('./routes/generator');
//LOG REQUEST
router.use((req, res, next) => {
    console.log(`REQUEST: [${req.method}] - URL: [${req.url}]`);
    res.on('finish', () => {
        console.log(`[${req.method}] RESULT STATUS: [${res.statusCode}]`);
    });
    next();
});
//MIDDLEWARE
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
//RULES 
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});
//ROUTES
router.use(generatorRoutes);
//MONGOOSE
try {
    mongoose.connect("mongodb+srv://afn1988:" + encodeURIComponent('@V3iro#2021') + "@cluster0.ubwap.mongodb.net/Home");
}
catch (error) {
    console.log("MONGOOSE CONNECTION FAILED [ERROR] [" + error + "]");
}
const httpServer = http_1.default.createServer(router);
httpServer.listen(3021, () => console.log("Server HaasOrc UP on port:3021"));
