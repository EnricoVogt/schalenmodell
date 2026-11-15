import { randomPositionInCircle } from "../util";
import { Circle } from "./Circle";

export class Proton extends Circle {
    constructor() {
        super({ pos: randomPositionInCircle(30), r: 5, style: { fill: 'green' } })
    }
}