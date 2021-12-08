import { readFileToStringArray } from "./helper"

const input = readFileToStringArray()
    .map(line => ({
        signalPatterns: line.split("|")[0].trim().split(/\s+/),
        output: line.split("|")[1].trim().split(/\s+/)
    }))

part1()
part2()

function part1() {
    let countEasyDigits = 0
    input.forEach(display => {
        countEasyDigits += display.output.filter(digit => [2, 3, 4, 7].includes(digit.length)).length
    })
    console.log(countEasyDigits);
}

function part2() {
    let totalResult = 0
    for (const display of input) {
        // find unique numbers
        let numbers: string[] = new Array(10)
        display.signalPatterns.forEach(pattern => {
            switch (pattern.length) {
                case 2:
                    numbers[1] = pattern
                    break
                case 4:
                    numbers[4] = pattern
                    break
                case 3:
                    numbers[7] = pattern
                    break
                case 7:
                    numbers[8] = pattern
                    break
            }
        })
        // find other numbers
        let sixDigits = display.signalPatterns.filter(pattern => pattern.length == 6)
        numbers[6] = sixDigits.filter(pattern => !includes(pattern, numbers[1]))[0]
        sixDigits = sixDigits.filter(pattern => pattern != numbers[6])
        numbers[9] = sixDigits.filter(pattern => includes(pattern, numbers[4]))[0]
        numbers[0] = sixDigits.find(pattern => pattern != numbers[9])

        let fiveDigits = display.signalPatterns.filter(pattern => pattern.length == 5)
        numbers[3] = fiveDigits.filter(pattern => includes(pattern, numbers[1]))[0]
        fiveDigits = fiveDigits.filter(pattern => pattern != numbers[3])
        numbers[5] = fiveDigits.filter(pattern => includes(pattern, numbers[4].replace(numbers[1][0], '').replace(numbers[1][1], '')))[0]
        numbers[2] = fiveDigits.find(pattern => pattern != numbers[5])
        
        // decode output
        let result = ""
        display.output.forEach(number => {
            for(let i = 0; i < numbers.length; i++){
                if(includes(number, numbers[i]) && number.length == numbers[i].length){
                    result += i
                }
            }
        })
        totalResult += +result
        
    }
    console.log(totalResult);
    

    function includes(string, substring) {
        return Array.from(substring).every(char => string.includes(char))
    }
}