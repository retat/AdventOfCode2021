import { readFileToNumberArray } from "./helper"

const input = readFileToNumberArray()
part1()
part2()

function part1() {
    let index = 0
    let count = 0
    while (index <= input.length) {
        if (input[index] < input[++index]) {
            count++
        }
    }
    console.log(count)
}

function part2() {
    let index = 0
    let count = 0
    let countInc = 0
    let prevSum = 0
    let sum = 0
    while (index <= input.length) {
        sum += input[index++]
        if (++count == 3) {
            if (prevSum != 0 && sum > prevSum) {
                countInc++
            }
            prevSum = sum
            index -= 2
            sum = count = 0
        }
    }
    console.log(countInc)
}