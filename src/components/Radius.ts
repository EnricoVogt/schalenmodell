import { SimulationComponent, type SimulationObject } from "../SimulationState";


export class Radius extends SimulationComponent {

    constructor($: SimulationObject, public r: number) {
        super($)
    }

}