"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countChar = exports.inRange = exports.readFileToStringArray = exports.readFileToNumberArray = void 0;
var fs = require("fs");
function readFileToNumberArray(day, fileName) {
    if (fileName === void 0) { fileName = 'input'; }
    return fs.readFileSync("/home/rene/Workspace/AdventOfCode2021/input")
        .toString()
        .split("\n")
        .map(function (x) { return +x; });
}
exports.readFileToNumberArray = readFileToNumberArray;
function readFileToStringArray(day, fileName) {
    if (fileName === void 0) { fileName = 'input'; }
    return fs.readFileSync("/home/rene/Workspace/AdventOfCode2021/input")
        .toString()
        .split("\n");
}
exports.readFileToStringArray = readFileToStringArray;
function inRange(x, min, max) {
    return ((x - min) * (x - max) <= 0);
}
exports.inRange = inRange;
function countChar(char, word) {
    return (word.match(new RegExp(char, "g")) || []).length;
}
exports.countChar = countChar;
//# sourceMappingURL=helper.js.map