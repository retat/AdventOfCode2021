"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var input = (0, helper_1.readFileToNumberArray)(1);
input.forEach(function (number1) {
    input.forEach(function (number2) {
        input.forEach(function (number3) {
            // #bruteforce
            if (number1 + number2 + number3 === 2020) {
                console.log("test: " + number1 * number2 * number3);
            }
        });
    });
});
//# sourceMappingURL=day1.js.map