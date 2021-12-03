import { readFileToStringArray } from "./helper"

const input = readFileToStringArray().map(x => {
    return x.split('')
})

part1()
part2()

function part1() {
    let gammaRate = ""
    let epsilonRate = ""
    let index = 0
    
    function filterIndexForBit(index: number, bit: number) {
        return input.filter(x => {
            if (+x[index] == bit) {
                return true
            }
            return false
        }).length
    }

    while (index < input[0].length) {
        if (filterIndexForBit(index, 0) >= (input.length / 2)) {
            gammaRate += 0
            epsilonRate += 1
        } else {
            gammaRate += 1
            epsilonRate += 0
        }
        index++
    }
    console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
}

function part2() {
    let oxygenRating = input
    let co2Rating = input
    let index = 0
    let bit1 = []
    let bit0 = []

    while (index < input[0].length) {
        bit1 = oxygenRating.filter(x => {
            if (+x[index] == 1) {
                return true
            }
            return false
        })
        bit0 = oxygenRating.filter(x => {
            if (+x[index] == 0) {
                return true
            }
            return false
        })
        if (oxygenRating.length > 1) {
            oxygenRating = bit1.length >= bit0.length ? bit1 : bit0
        }
        bit1 = co2Rating.filter(x => {
            if (+x[index] == 1) {
                return true
            }
            return false
        })
        bit0 = co2Rating.filter(x => {
            if (+x[index] == 0) {
                return true
            }
            return false
        })
        if (co2Rating.length > 1) {
            co2Rating = bit0.length <= bit1.length ? bit0 : bit1
        }
        index++
    }
    console.log(co2Rating, oxygenRating);
}