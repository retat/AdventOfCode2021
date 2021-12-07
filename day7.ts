import * as fs from 'fs';

const input = fs.readFileSync("/home/rene/Workspace/AdventOfCode2021/input", "utf-8")
    .split(",")
    .map(x => ({ number: +x, fuelNeeded: 0 }))

part1()
part2()

function part1() {
    for (let position = 0; position < input.length; position++) {
        for (let i = 0; i < input.length; i++) {
            input[position].fuelNeeded += Math.abs(input[position].number - input[i].number)
        }
    }
    console.log(input.sort((a, b) => a.fuelNeeded - b.fuelNeeded)[0])
}

function part2() {
    for (let position = 0; position < input.length; position++) {
        for (let i = 0; i < input.length; i++) {
            input[position].fuelNeeded += calcFuel(Math.abs(input[position].number - input[i].number))
        }
    }
    console.log(input.sort((a, b) => a.fuelNeeded - b.fuelNeeded)[0])
}

function calcFuel(distance): number {
    let fuel = 0
    for (let i = 1; i <= distance; i++) {
        fuel += i
    }
    return fuel
}