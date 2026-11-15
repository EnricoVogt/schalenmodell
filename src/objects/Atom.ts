import { Translation } from "../components/Translate";
import { SimulationObject } from "../SimulationState";
import { getPosOnCircle } from "../util";
import { AtomicNucleus } from "./AtomicNucleus";
import { Circle } from "./Circle";

export interface AtomOptions {
    neutron:number,
    proton:number,
    shells: number[]
}

export class Atom extends SimulationObject {
    constructor(private options: AtomOptions) {
        super()

        this.addChild(new AtomicNucleus({proton:this.options.proton, neutron:this.options.neutron}))
        const shells = this.options.shells;
        shells.forEach((electrons,k) => {
            const shellRadius = 50+(20*(k+1));
            const shellRing = new Circle({ r: shellRadius, style: { borderFill: 'green' } })
            this.addChild(shellRing)
            for(let i = 0;i<electrons;i++) {
                const e = new Circle({ pos: getPosOnCircle(shellRadius, i*(360/electrons)), r: 7.5, style: { fill: 'green' } });
                e.addComponent(new Translation(e, [0,0],15))
                this.addChild(e)
            }
        })
    }
}