"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const PayGrid = require("../../models/paymentGrid");
/*****************************/
/* AUXILIAR FUNC             */
const generateRandowChar = (val) => {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    if (typeof val !== 'undefined') {
        alphabet = alphabet.replace(val, '');
    }
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
};
const rebuild20 = (arr, char, cnt) => {
    if (cnt >= 20) {
        return arr;
    }
    else {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        if (arr[x][y] === char) {
            arr = rebuild20(arr, char, cnt);
            return arr;
        }
        else {
            arr[x][y] = char;
            arr = rebuild20(arr, char, cnt + 1);
            return arr;
        }
    }
};
const countChar = (arr, char) => {
    var counter = 0;
    arr.forEach(el => {
        el.forEach(element => {
            if (element === char)
                counter++;
        });
    });
    return counter;
};
const getMin9 = (val, reclvl) => {
    if (val <= 9) {
        return Math.floor(val);
    }
    else {
        val = getMin9(val * (reclvl - 1) / reclvl, reclvl + 1);
        return val;
    }
};
const getSecret = (arr, sec) => {
    let i = Math.floor(sec / 10);
    let j = sec % 10;
    let code;
    code = getMin9(countChar(arr, arr[i][j]), 2) * 10 + getMin9(countChar(arr, arr[j][i]), 2);
    return code;
};
/*****************************/
/* ROUTES                    */
router.get("/generator", (req, res) => {
    let grid = [];
    for (let i = 0; i < 10; i++) {
        grid.push([]);
        for (let j = 0; j < 10; j++) {
            grid[i].push(generateRandowChar());
        }
    }
    res.status(200);
    res.json({ grid: grid });
});
router.get("/generator/:id", (req, res) => {
    const { id } = req.params;
    let grid = [];
    for (let i = 0; i < 10; i++) {
        grid.push([]);
        for (let j = 0; j < 10; j++) {
            grid[i].push(generateRandowChar(id));
        }
    }
    grid = rebuild20(grid, id, 0);
    res.status(200);
    res.json({ grid: grid });
});
router.post("/code", (req, res) => {
    var jsontst = req.body;
    let code;
    try {
        code = getSecret(jsontst.grid, jsontst.sec);
        res.status(200);
        res.json({ code: code });
    }
    catch (error) {
        res.status(400).send("Something went wrong");
    }
});
router.route("/update").post((req, res) => {
    const body = req.body;
    PayGrid.deleteMany({}, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            console.log(result);
        }
    });
    const updatedBudget = new PayGrid(body);
    updatedBudget.save(function (err, doc) {
        if (err)
            return res.send(err);
        res.send("Document inserted succussfully!");
    });
});
router.route("/get").get((req, res) => {
    PayGrid.find({}).then(model => {
        res.json({ model });
    });
});
module.exports = router;
