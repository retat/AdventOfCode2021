import { readFileToStringArray } from "./helper"

const input = readFileToStringArray().map(line => {
    return { "direction": line.split(' ')[0], "distance": +line.split(' ')[1] }
})

part1()
part2()

function getDistanceForDirection(direction: string) {
    return input.reduce((prev, cur) => {
        return (cur.direction == direction) ? prev + cur.distance : prev
    }, 0)
}

function part1() {
    console.log(getDistanceForDirection('forward') * (getDistanceForDirection('down') - getDistanceForDirection('up')))
}

function part2() {
    let aim = 0
    let depth = 0

    input.forEach(instruction => {
        switch (instruction.direction) {
            case 'forward':
                depth += instruction.distance * aim
                break
            case 'up':
                aim -= instruction.distance
                break
            case 'down':
                aim += instruction.distance
        }
    })
    console.log(getDistanceForDirection('forward') * depth)
}