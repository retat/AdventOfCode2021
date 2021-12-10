import * as fs from 'fs';

const input = fs.readFileSync("/home/rene/Workspace/AdventOfCode2021/input", "utf-8")
    .split("\n").map(line => line.split(""))

let brackets = []
let incompleteLines = []
part1()
part2()

function part1() {
    let points = 0
    for (let line = 0; line < input.length; line++) {
        let corrupt = false
        for (let i = 0; i < input[line].length; i++) {
            if (brackets.length > 0 && isClosingBracket(input[line][i])) {
                if (brackets[brackets.length - 1] != getOpeningbracket(input[line][i])) {
                    switch (input[line][i]) {
                        case '}':
                            points += 1197
                            break
                        case ')':
                            points += 3
                            break
                        case ']':
                            points += 57
                            break
                        case '>':
                            points += 25137
                            break
                    }
                    i = input[line].length
                    corrupt = true
                }
                brackets.pop()
            } else {
                brackets.push(input[line][i])
            }
        }
        if (!corrupt) incompleteLines.push(brackets)
        brackets = []
    }
    console.log(points);
}

function part2() {
    let points = 0
    let totalScore = []
    incompleteLines.forEach(line => {
        for (let i = line.length - 1; i >= 0; i--) {
            switch (line[i]) {
                case '(':
                    points *= 5
                    points += 1
                    break
                case '[':
                    points *= 5
                    points += 2
                    break
                case '{':
                    points *= 5
                    points += 3
                    break
                case '<':
                    points *= 5
                    points += 4
                    break
            }
        }
        totalScore.push(points)
        points = 0
    })
    console.log(totalScore.sort((a,b) => a-b)[Math.floor((totalScore.length/2))])
}

function isClosingBracket(bracket) {
    return ['}', ']', ')', '>'].includes(bracket)
}

function getOpeningbracket(bracket): string {
    switch (bracket) {
        case '}':
            return '{'
            break
        case ')':
            return '('
            break
        case ']':
            return '['
            break
        case '>':
            return '<'
            break
    }
}