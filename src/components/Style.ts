import { SimulationComponent, SimulationObject } from "../SimulationState";

export class Style extends SimulationComponent {

    fill = null
    borderFill = '#b3ff56'
    border = 3

    constructor($: SimulationObject, public style: { fill: string, borderFill: string; border: number }) { super($) }
}

