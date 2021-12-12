import * as fs from 'fs';

let input = fs.readFileSync("/home/rene/Workspace/AdventOfCode2021/input", "utf-8")
    .split("\n").map(line => line.split("").map(octopus => ({ octopus: +octopus, increment: false })))

// 1
part(100)
// 2
part(1000)

function part(steps) {
    let totalFlashes = 0
    let flashesPerStep = 0
    for (let step = 0; step < steps; step++) {
        increment()
        let flashes = flash()
        totalFlashes += flashes
        flashesPerStep += flashes
        while (flashes != 0) {
            incrementAroundZeroes()
            flashes = flash()
            totalFlashes += flashes
            flashesPerStep += flashes
        }
        if (flashesPerStep == 100) {
            console.log("synchronized at step " + step);
            step = 1000
        }
        flashesPerStep = 0
    }
    console.log(totalFlashes);
}

function increment() {
    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].map(octopus => ({ octopus: octopus.octopus + 1, increment: false }))
    }
}

function incrementAroundZeroes() {
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x].octopus == 0 && input[y][x].increment) {
                const freeTop = y - 1 >= 0
                const freeBottom = y + 1 < input.length
                const freeLeft = x - 1 >= 0
                const freeRight = x + 1 < input[y].length
                if (freeTop && input[y - 1][x].octopus != 0) {
                    input[y - 1][x].octopus++
                    input[y][x].increment = false
                }
                if (freeBottom && input[y + 1][x].octopus != 0) {
                    input[y + 1][x].octopus++
                    input[y][x].increment = false
                }
                if (freeLeft && input[y][x - 1].octopus != 0) {
                    input[y][x - 1].octopus++
                    input[y][x].increment = false
                }
                if (freeRight && input[y][x + 1].octopus != 0) {
                    input[y][x + 1].octopus++
                    input[y][x].increment = false
                }
                if (freeTop && freeRight && input[y - 1][x + 1].octopus != 0) {
                    input[y - 1][x + 1].octopus++
                    input[y][x].increment = false
                }
                if (freeTop && freeLeft && input[y - 1][x - 1].octopus != 0) {
                    input[y - 1][x - 1].octopus++
                    input[y][x].increment = false
                }
                if (freeBottom && freeRight && input[y + 1][x + 1].octopus != 0) {
                    input[y + 1][x + 1].octopus++
                    input[y][x].increment = false
                }
                if (freeBottom && freeLeft && input[y + 1][x - 1].octopus != 0) {
                    input[y + 1][x - 1].octopus++
                    input[y][x].increment = false
                }
                input[y][x].increment = false
            }
        }
    }
}

function flash() {
    for (let i = 0; i < input.length; i++) {
        input[i] = input[i].map(octopus => {
            if (octopus.octopus > 9) {
                return ({ octopus: 0, increment: true })
            }
            return octopus
        })
    }
    return input.flat(2).filter(octopus => octopus.octopus == 0 && octopus.increment).length
}