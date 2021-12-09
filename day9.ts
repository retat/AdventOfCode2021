import * as fs from 'fs';

const input = fs.readFileSync("/home/rene/Workspace/AdventOfCode2021/input", "utf-8")
    .split("\n").map(line => line.split(""))

let lowPoints = []

part1()
part2()

function part1() {
    let riskLevel = 0
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x <= input[y].length; x++) {
            if (getAdjacentLocations(x, y).every(location => location.value > input[y][x])) {
                riskLevel += (1 + +input[y][x])
                lowPoints.push(({ x: x, y: y, value: +input[y][x] }))
            }
        }
    }
    console.log(riskLevel)
}

function part2() {
    let total = 0
    let basins = []
    lowPoints.forEach(point => {
        markAllAdjacentLocations(point.x, point.y)
        basins.push(input.flat(2).filter(location => location == '10').length - total)
        total = input.flat(2).filter(location => location == '10').length
    })
    basins = basins.sort((a, b) => b-a)
    console.log(basins[0] * basins[1] * basins[2]);
}

function markAllAdjacentLocations(x, y): number {
    input[y][x] = '10'
    let adjacentLocations = getAdjacentLocations(x, y).filter(location => location.value != 9 && location.value != 10)
    if (adjacentLocations.length != 0) {
        adjacentLocations.forEach(location => {
            markAllAdjacentLocations(location.x, location.y)
        })
    } else {
        return 0
    }
}

function getAdjacentLocations(x, y) {
    let adjacentLocations = []
    if (y - 1 >= 0) adjacentLocations.push(({ value: input[y - 1][x], x: x, y: y - 1 }))
    if (y + 1 < input.length) adjacentLocations.push(({ value: input[y + 1][x], x: x, y: y + 1 }))
    if (x - 1 >= 0) adjacentLocations.push(({ value: input[y][x - 1], x: x - 1, y: y }))
    if (x + 1 < input[y].length) adjacentLocations.push(({ value: input[y][x + 1], x: x + 1, y: y }))
    return adjacentLocations
}