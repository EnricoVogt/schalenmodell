import { idGenerator } from "./util";


export interface SimulationContext {
    dispatchEvent: (event: SimulationEvent) => void
    simulationState: () => SimulationState
}

export abstract class SimulationComponent {
    constructor(protected $: SimulationObject) { }

    step?(stepMS: number, s: SimulationContext): void
}

export type ComponentType<T extends SimulationComponent = SimulationComponent> = abstract new (...args: any[]) => T;

export class SimulationObject {

    private components = new Map<ComponentType, SimulationComponent>();
    private children = new Map<number, SimulationObject>();
    id = idGenerator.next();


    addChild(c: SimulationObject){
        this.children.set(c.id, c);
    }

    getChild(id:number) {
        return this.children.get(id);
    }

    removeChild(c: SimulationObject) {
        this.children.delete(c.id);
    }

    addComponent<T extends SimulationComponent>(component: T): T {
        this.components.set(component.constructor as ComponentType, component);
        return component;
    }

    getComponent<T extends SimulationComponent>(type: ComponentType<T>): T | undefined {
        return this.components.get(type) as T | undefined;
    }

    deleteComponent(c: ComponentType): void {
        this.components.delete(c);
    }

    step(stepMS: number, s: SimulationContext): void {
        this.components.forEach(c => c.step?.(stepMS, s))
        this.children.forEach(c => c.step?.(stepMS, s))
    }
}

export interface SimState {
    step: number;
    elapsedTime: number;
    simulationObjects: Map<number, SimulationObject>
}

export type SimulationEvent =
    | { type: 'advanceStep', stepMS: number }
    | { type: 'createObject', simObj: SimulationObject }
    | { type: 'destoryObject', id: number }
    | { type: 'clear' }
    | { type: 'addComponent', id: number, component: SimulationComponent }
    | { type: 'removeComponent', id: number, component: SimulationComponent }

export type SimulationEventType = SimulationEvent['type'];

type SimulationEventHandler<K extends SimulationEventType> =
    (event: Extract<SimulationEvent, { type: K }>, state: SimState) => void;

type EventReducer = { [K in SimulationEventType]: SimulationEventHandler<K> };

const eventReducer: EventReducer = {
    advanceStep: (event: { type: 'advanceStep', stepMS: number }, simState: SimState) => {
        simState.step += 1;
        simState.elapsedTime += event.stepMS
    },
    createObject: (event: { type: 'createObject', simObj: SimulationObject }, simState: SimState) => {
        simState.simulationObjects.set(event.simObj.id, event.simObj);
    },
    destoryObject: (event: { type: 'destoryObject', id: number }, simState: SimState) => { 
        simState.simulationObjects.delete(event.id);
    },
    clear: (_event: SimulationEvent, simState: SimState) => {
        simState.simulationObjects = new Map();
    },
    addComponent: (_event: SimulationEvent, _simState: SimState) => {
        //TODO
    },
    removeComponent: (_event: SimulationEvent, _simState: SimState) => {
        //TODO
    },
}

export class SimulationState {
    simState: SimState = {
        step: 0,
        elapsedTime: 0,
        simulationObjects: new Map()
    }

    onEvent: (x: { step: number, event: SimulationEvent }) => void = () => { }

    dispatchEvent(event: SimulationEvent) {
        const handler = eventReducer[event.type] as SimulationEventHandler<SimulationEventType>;
        handler(event, this.simState);
        this.onEvent({ step: this.simState.step, event })
    }
}
