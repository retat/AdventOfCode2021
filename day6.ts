import * as fs from 'fs';

part1()
part2()

// OG solution
function part1() {
    const population = fs.readFileSync("/home/rene/Workspace/AdventOfCode2021/input", "utf-8")
        .split(",")
        .map(x => +x)

    let days = 80

    while (days > 0) {
        for (let i = 0; i < population.length; i++) {
            if (population[i] == 0) {
                population.push(9)
                population[i] = 6
            } else {
                population[i]--
            }
        }
        days--
    }
    console.log(population.length)
}

// smarter solution
function part2() {
    const population = fs.readFileSync("/home/rene/Workspace/AdventOfCode2021/input", "utf-8")
        .split(",")
        .map(x => +x)

    let days = 256
    let dueDays = Array(9).fill(0)

    population.forEach(age => dueDays[age] += 1)

    while (days > 0) {
        const parent = dueDays[0]
        const fish = dueDays.slice(1,9)
        dueDays = fish.concat(parent)
        dueDays[6] += parent
        days--
    }
    console.log(dueDays.reduce((prev, cur) => prev + cur))
}
