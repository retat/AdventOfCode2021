import * as fs from 'fs'

const input = fs.readFileSync("/home/rene/Workspace/AdventOfCode2021/input")
    .toString()
    .split('\n\n')
    .map(block => block.trim())

const boards = []

input.slice(1).forEach(board => {
    boards.push(
        board.split('\n').map(line =>
            line.trim().split(/\s+/).map(number => ({ value: +number, drawn: false }))
        )
    )
})

const numbers = input[0].split(",").map(number => +number)

numbers.forEach(number => {
    boards.filter(board => !hasBingo(board)).forEach(board => drawNumberOnBoard(board, number))
})

function drawNumberOnBoard(board, number: number) {
    const hasNumber = board.flat(2).find(x => x.value === number)
    if (hasNumber) {
        hasNumber.drawn = true
    }

    if (hasBingo(board)) {
        const notDrawnNumbers = board.flat(2).filter(number => !number.drawn)
        console.log(number * notDrawnNumbers.reduce((prev, cur) => prev + cur.value, 0))
    }
}

function hasBingo(board) {
    let found = false
    // horizontal
    board.forEach(line => {
        if (!line.find(number => number.drawn == false)) {
            found = true
        }
    })
    // vertical
    for (let index = 0; index < 5; index++) {
        for (let line = 0; line < 5; line++) {
            if (board[line][index].drawn == false) {
                line = 5
            } else if (line == 4) {
                found = true
            }
        }
    }
    return found
}