
// Moves the object along a circle around `targetPosition` (the orbit center, in the parent's
// local coordinates) at `speed` units/s. Radius and start angle come from the object's
// position at its first step, so every electron keeps its own shell and spacing.

import { SimulationComponent, SimulationObject, type SimulationContext } from "../SimulationState";
import { Position } from "./Position";


export class Translation extends SimulationComponent {

    private angle?: number;
    private radius = 0;

    constructor($: SimulationObject, public targetPosition: number[], public speed: number) {
        super($);
    }

    step(stepMS: number, _s: SimulationContext): void {
        const pos = this.$.getComponent(Position);
        if (!pos) return;
        const [cx, cy] = this.targetPosition;

        if (this.angle === undefined) {
            const dx = pos.position[0] - cx;
            const dy = pos.position[1] - cy;
            this.radius = Math.hypot(dx, dy);
            this.angle = Math.atan2(dy, dx);
        }

        const stepDistance = (this.speed * stepMS) / 1000;
        this.angle = (this.angle + stepDistance / this.radius) % (Math.PI * 2);

        pos.position[0] = cx + this.radius * Math.cos(this.angle);
        pos.position[1] = cy + this.radius * Math.sin(this.angle);
    }
}
