import { SimulationComponent, SimulationObject, type SimulationContext } from "../SimulationState";

export class Position extends SimulationComponent {

    position = [0, 0]

    constructor($: SimulationObject, position: number[]) { 
        super($) 
        this.position = position;
    }

    step(_stepMS: number, _s: SimulationContext): void {

    }
}

