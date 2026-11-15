import { randomPositionInCircle } from "../util";
import { Circle } from "./Circle";

export class Neutron extends Circle {
    constructor() {
        super({ pos: randomPositionInCircle(30), r: 5, style: { fill: '#d29b44' } })
    }
}