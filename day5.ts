import { readFileToStringArray } from "./helper"

const lines = readFileToStringArray()
    .map(line => line.split("->")
        .map(segment => ({ x: +segment.trim().split(",")[0], y: +segment.trim().split(",")[1] })))

const diagramSize = 1000
let diagram: number[][] = new Array(diagramSize).fill(0).map(() => new Array(diagramSize).fill(0))

lines.forEach(line => drawLine(line))

function drawLine(line) {
    if (line[0].x == line[1].x && line[0].y > line[1].y) {
        // go down
        while (line[0].y >= line[1].y) {
            diagram[line[0].y][line[0].x]++
            line[0].y--
        }
    } else if (line[0].x == line[1].x && line[0].y < line[1].y) {
        // go up
        while (line[0].y <= line[1].y) {
            diagram[line[0].y][line[0].x]++
            line[0].y++
        }
    } else if (line[0].y == line[1].y && line[0].x > line[1].x) {
        // go left
        while (line[0].x >= line[1].x) {
            diagram[line[0].y][line[0].x]++
            line[0].x--
        }
    } else if (line[0].y == line[1].y && line[0].x < line[1].x) {
        // go right
        while (line[0].x <= line[1].x) {
            diagram[line[0].y][line[0].x]++
            line[0].x++
        }
    } else if (line[0].x < line[1].x && line[0].y < line[1].y) {
        // go diagonally down right
        while (line[0].x <= line[1].x && line[0].y <= line[1].y) {
            diagram[line[0].y][line[0].x]++
            line[0].x++
            line[0].y++
        }
    } else if (line[0].x < line[1].x && line[0].y > line[1].y) {
        // go diagonally up right
        while (line[0].x <= line[1].x && line[0].y >= line[1].y) {
            diagram[line[0].y][line[0].x]++
            line[0].x++
            line[0].y--
        }
    } else if (line[0].x > line[1].x && line[0].y < line[1].y) {
        // go diagonally down left
        while (line[0].x >= line[1].x && line[0].y <= line[1].y) {
            diagram[line[0].y][line[0].x]++
            line[0].x--
            line[0].y++
        }
    } else if (line[0].x > line[1].x && line[0].y > line[1].y) {
        // go diagonally up left
        while (line[0].x >= line[1].x && line[0].y >= line[1].y) {
            diagram[line[0].y][line[0].x]++
            line[0].x--
            line[0].y--
        }
    }
}

console.log(diagram.flat(2).filter(x => x > 1).length)
