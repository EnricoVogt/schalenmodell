
import { Circle } from "./Circle";
import { Neutron } from "./Neutron";
import { Proton } from "./Proton";

const defaultOptions = { neutron: 0, proton: 0 };

export class AtomicNucleus extends Circle  {

    constructor(opts:any = defaultOptions) {
        super({ r: 50, style: { fill: '#67fd6786' } })
        
        this.options = {...defaultOptions, ...opts}
        for(let i = 0;i < this.options.neutron;i++) {
            this.addChild(new Neutron())
        }
        for(let i = 0;i < this.options.proton;i++) {
            this.addChild(new Proton())
        }
    }
}