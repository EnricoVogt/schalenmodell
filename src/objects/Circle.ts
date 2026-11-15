import { Position } from "../components/Position";
import { Radius } from "../components/Radius";
import { Style } from "../components/Style";
import { SimulationObject } from "../SimulationState";

const defaultOptions = { pos: [0,0],r: 0, style: { border: 1, borderFill: 'black', fill: 'transparent' } };

export class Circle extends SimulationObject {
    protected options;
    constructor(opts:any = defaultOptions) {
        super()

        this.options = {
            ...defaultOptions, 
            ...opts,
            style: {...defaultOptions.style, ...opts.style}
        }
        this.addComponent(new Position(this, this.options.pos))
        this.addComponent(new Radius(this, this.options.r))
        this.addComponent(new Style(this, this.options.style))
    }
}