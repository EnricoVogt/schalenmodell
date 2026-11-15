import { elementRegistry } from "./Element";
import { SimulationState, type SimulationEvent } from "./SimulationState";

export type SimulationCommand = | { type: 'displayElement', ordinalNumber: number }

export class Simulation {
    private simulationState = new SimulationState();
    private simulationEventQueue: SimulationEvent[] = [];
    private simulationContext = this.createSimulationContext();

    private createSimulationContext(): {
        dispatchEvent: (event: SimulationEvent) => void
        simulationState: () => SimulationState
    } {
        return {
            simulationState: () => this.simulationState,
            dispatchEvent: (event: SimulationEvent) => { this.simulationEventQueue.push(event); },
        };
    }
    
    get state(): SimulationState {
        return this.simulationState;
    }

    step(stepMS: number, commands: SimulationCommand[]) {
        this.simulationEventQueue = []
        commands.forEach(c => {
            if(c.type === 'displayElement') {
                this.simulationEventQueue.push({type:'clear'});
                const el = elementRegistry.get(c.ordinalNumber);
                this.simulationEventQueue.push({type:'createObject', simObj: el});
            }
        });
        this.simulationState.simState.simulationObjects.forEach(x => x.step(stepMS, this.simulationContext));
        // console.log(this.simulationEventQueue) // simulations events sollten auf einer priority queue landen... 
        // alles ab 10k events abschneiden?!?!?!
        // welche events haben welche prio?    
        this.simulationEventQueue.forEach(x => this.simulationState.dispatchEvent(x));
        this.simulationState.dispatchEvent({ type: 'advanceStep', stepMS })
        //console.log(this.state)
    }
}