import * as fs from 'fs';

export function readFileToNumberArray() {
    return fs.readFileSync("/home/rene/Workspace/AdventOfCode2021/input")
        .toString()
        .split("\n")
        .map(x => +x);
}

export function readFileToStringArray() {
    return fs.readFileSync("/home/rene/Workspace/AdventOfCode2021/input")
        .toString()
        .split("\n")
}

export function inRange(x: number, min: number, max: number): boolean {
    return ((x - min) * (x - max) <= 0);
}

export function countChar(char: string, word: string): number {
    return (word.match(new RegExp(char, "g")) || []).length;
}
