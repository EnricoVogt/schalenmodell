import { randomPositionInCircle } from "../util";
import { Circle } from "./Circle";

export class Shell extends Circle {
    constructor() {
        super({ pos: randomPositionInCircle(42.5), r: 7.5, style: { fill: 'green' } })
    }
}