"use strict";
const mongoose = require("mongoose");
const payGridSchema = {
    payments: [
        {
            ammount: Number,
            code: Number,
            grid: [
                {
                    grid: [
                        [String]
                    ],
                    sec: Number
                }
            ],
            name: String
        }
    ]
};
const PayGrid = mongoose.model("payGrid", payGridSchema, "PayGridSchema");
module.exports = PayGrid;
