import type { Simulation, SimulationCommand } from "./Simulation";
import { Element } from "./Element";
import { Position } from "./components/Position";
import { Radius } from "./components/Radius";
import { Style } from "./components/Style";
import type { SimState, SimulationObject } from "./SimulationState";

export interface CanvasRendererOptions {
    container?: HTMLElement;
    pxPerUnit?: number;
    gridStep?: number;
    majorEvery?: number;
    showNames?: boolean;
    showCoords?: boolean;
    step?: (stepMS: number, commands: SimulationCommand[]) => void;
    stepMS?: number;
    controls?: boolean;
}

const DEBUG = import.meta.env.VITE_DEBUG === "true";

const COLORS = {
    background: "#14161b",
    minor: "rgba(255,255,255,0.05)",
    major: "rgba(255,255,255,0.12)",
    axis: "rgba(255,255,255,0.28)",
    unitStroke: "#0b0c10",
    text: "#e8e8e8",
    hudBg: "rgba(0,0,0,0.55)",
};

export class CanvasRenderer {
    readonly canvas = document.createElement("canvas");
    private ctx: CanvasRenderingContext2D;
    private pxPerUnit: number;
    private gridStep: number;
    private majorEvery: number;
    showNames: boolean;
    showCoords: boolean;

    private cam = { x: 0, y: 0, zoom: 1 };
    private width = 0;
    private height = 0;
    private dpr = 1;
    private rafId = 0;
    private resizeObserver: ResizeObserver;

    constructor(options: CanvasRendererOptions = {}) {
        this.pxPerUnit = options.pxPerUnit ?? 4;
        this.gridStep = options.gridStep ?? 10;
        this.majorEvery = options.majorEvery ?? 5;
        this.showNames = options.showNames ?? false;
        this.showCoords = options.showCoords ?? false;

        const container = options.container ?? document.body;
        Object.assign(this.canvas.style, { display: "block", width: "100%", height: "100%", touchAction: "none" });
        if (container === document.body) {
            Object.assign(this.canvas.style, { width: "100vw", height: "100vh", position: "fixed", inset: "0", zIndex: "-1" });
        }
        container.appendChild(this.canvas);

        const ctx = this.canvas.getContext("2d");
        if (!ctx) throw new Error("CanvasRenderer: 2D context not available");
        this.ctx = ctx;

        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this.canvas);
        this.resize();
        this.bindInput();

        if ((options.controls ?? true) && options.step) {
            this.controls = new SimControls(options.step, options.stepMS ?? 1000 / 60);
        }
    }

    readonly controls?: SimControls;

    issue(command: SimulationCommand): void {
        this.controls?.issue(command);
    }

    start(getState: () => SimState): void {
        this.stop();
        const loop = () => {
            this.render(getState());
            this.rafId = requestAnimationFrame(loop);
        };
        this.rafId = requestAnimationFrame(loop);
    }

    stop(): void {
        cancelAnimationFrame(this.rafId);
        this.rafId = 0;
    }

    dispose(): void {
        this.stop();
        this.controls?.dispose();
        this.resizeObserver.disconnect();
        this.canvas.remove();
    }

    render(state: SimState): void {
        const { ctx } = this;
        ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        ctx.fillStyle = COLORS.background;
        ctx.fillRect(0, 0, this.width, this.height);

        this.drawGrid();
        const count = this.drawUnits(state);
        if (DEBUG) this.drawHud(state, count);
    }

    private get scale(): number {
        return this.pxPerUnit * this.cam.zoom;
    }

    worldToScreen(x: number, y: number): [number, number] {
        return [(x - this.cam.x) * this.scale + this.width / 2, (y - this.cam.y) * this.scale + this.height / 2];
    }

    screenToWorld(sx: number, sy: number): [number, number] {
        return [(sx - this.width / 2) / this.scale + this.cam.x, (sy - this.height / 2) / this.scale + this.cam.y];
    }

    private drawGrid(): void {
        const { ctx, gridStep, majorEvery } = this;
        const majorStep = gridStep * majorEvery;
        const [wx0, wy0] = this.screenToWorld(0, 0);
        const [wx1, wy1] = this.screenToWorld(this.width, this.height);

        const minorVisible = gridStep * this.scale >= 8;
        const step = minorVisible ? gridStep : majorStep;
        const isMajor = (v: number) => Math.abs(v % majorStep) < 1e-9;

        const strokeLines = (filter: (v: number) => boolean, color: string) => {
            ctx.beginPath();
            for (let v = Math.ceil(wx0 / step) * step; v <= wx1; v += step) {
                if (!filter(v)) continue;
                const x = Math.round(this.worldToScreen(v, 0)[0]) + 0.5;
                ctx.moveTo(x, 0); ctx.lineTo(x, this.height);
            }
            for (let v = Math.ceil(wy0 / step) * step; v <= wy1; v += step) {
                if (!filter(v)) continue;
                const y = Math.round(this.worldToScreen(0, v)[1]) + 0.5;
                ctx.moveTo(0, y); ctx.lineTo(this.width, y);
            }
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.stroke();
        };

        if (minorVisible) strokeLines(v => !isMajor(v), COLORS.minor);
        strokeLines(v => isMajor(v) && v !== 0, COLORS.major);
        strokeLines(v => v === 0, COLORS.axis);
    }

    private drawUnits(state: SimState): number {
        const childIds = new Set<number>();
        const visit = (o: SimulationObject) => childrenOf(o).forEach(c => { childIds.add(c.id); visit(c); });
        state.simulationObjects.forEach(visit);

        const drawn = new Set<SimulationObject>();
        let count = 0;
        const draw = (obj: SimulationObject, px: number, py: number) => {
            if (drawn.has(obj)) return;
            drawn.add(obj);
            const local = obj.getComponent(Position)?.position ?? [0, 0];
            const wx = px + local[0], wy = py + local[1];
            if (this.drawObject(obj, this.worldToScreen(wx, wy), local)) count++;
            childrenOf(obj).forEach(c => draw(c, wx, wy));
        };
        state.simulationObjects.forEach(obj => { if (!childIds.has(obj.id)) draw(obj, 0, 0); });
        return count;
    }

    private drawObject(obj: SimulationObject, [sx, sy]: [number, number], local: number[]): boolean {
        const { ctx } = this;
        if (!obj.getComponent(Position)) return false;

        const r = Math.max(3, (obj.getComponent(Radius)?.r ?? 1) * this.scale);
        if (sx < -r || sy < -r || sx > this.width + r || sy > this.height + r) return true;

        const style = obj.getComponent(Style)?.style;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        if (style) {
            ctx.fillStyle = style.fill || 'transparent';
            ctx.fill();
            if (style.border > 0) {
                ctx.lineWidth = style.border;
                ctx.strokeStyle = style.borderFill;
                ctx.stroke();
            }
        } else {
            ctx.fillStyle = `hsl(${(obj.id * 137.508) % 360}, 60%, 50%)`;
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = COLORS.unitStroke;
            ctx.stroke();
        }

        const parts: string[] = [];
        if (this.showNames) parts.push(`${obj.constructor.name} #${obj.id}`);
        if (this.showCoords) parts.push(`(${fmt(local[0])}, ${fmt(local[1])})`);
        if (parts.length) {
            ctx.fillStyle = COLORS.text;
            ctx.font = "11px monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.fillText(parts.join(" "), sx, sy - r - 3);
        }
        return true;
    }

    private drawHud(state: SimState, units: number): void {
        const { ctx } = this;
        const lines = [
            `step   ${state.step}`,
            `time   ${(state.elapsedTime / 1000).toFixed(2)}s`,
            `units  ${units}`,
            `zoom   ${this.cam.zoom.toFixed(2)}x`,
        ];
        const pad = 8, lh = 16, w = 140;
        const x = this.width - w - 8;
        ctx.fillStyle = COLORS.hudBg;
        ctx.fillRect(x, 8, w, pad * 2 + lines.length * lh);
        ctx.fillStyle = COLORS.text;
        ctx.font = "12px monospace";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        lines.forEach((l, i) => ctx.fillText(l, x + pad, 8 + pad + i * lh));
    }

    private resize(): void {
        this.dpr = window.devicePixelRatio || 1;
        this.width = this.canvas.clientWidth || 800;
        this.height = this.canvas.clientHeight || 600;
        this.canvas.width = Math.round(this.width * this.dpr);
        this.canvas.height = Math.round(this.height * this.dpr);
    }

    private bindInput(): void {
        const c = this.canvas;
        let dragging = false;
        let lastX = 0, lastY = 0;

        c.addEventListener("pointerdown", e => {
            if (!e.shiftKey) return;
            dragging = true;
            lastX = e.clientX; lastY = e.clientY;
            c.setPointerCapture(e.pointerId);
        });
        c.addEventListener("pointermove", e => {
            if (!dragging) return;
            if (!e.shiftKey) { dragging = false; return; }
            this.cam.x -= (e.clientX - lastX) / this.scale;
            this.cam.y -= (e.clientY - lastY) / this.scale;
            lastX = e.clientX; lastY = e.clientY;
        });
        const end = () => { dragging = false; };
        c.addEventListener("pointerup", end);
        c.addEventListener("pointercancel", end);

        c.addEventListener("wheel", e => {
            e.preventDefault();
            if (!e.shiftKey) {
                if (e.deltaY !== 0) this.controls?.shiftElement(Math.sign(e.deltaY));
                return;
            }
            const delta = e.deltaY || e.deltaX;
            const rect = c.getBoundingClientRect();
            const sx = e.clientX - rect.left, sy = e.clientY - rect.top;
            const [bx, by] = this.screenToWorld(sx, sy);
            this.cam.zoom = Math.min(20, Math.max(0.05, this.cam.zoom * Math.exp(-delta * 0.0015)));
            const [ax, ay] = this.screenToWorld(sx, sy);
            this.cam.x += bx - ax;
            this.cam.y += by - ay;
        }, { passive: false });

        c.addEventListener("dblclick", e => { if (e.shiftKey) this.cam = { x: 0, y: 0, zoom: 1 }; });
    }
}

const SPEEDS: { label: string; value: number }[] = [
    { label: "0.1x", value: 0.1 },
    { label: "0.25x", value: 0.25 },
    { label: "0.5x", value: 0.5 },
    { label: "1x", value: 1 },
    { label: "2x", value: 2 },
    { label: "4x", value: 4 },
    { label: "10x", value: 10 },
    { label: "max", value: Infinity },
];

const PICKABLE_ELEMENTS = Object.values(Element)
    .filter((v): v is Element => typeof v === "number");

export class SimControls {
    readonly el = document.createElement("div");
    private playBtn = document.createElement("button");
    private stepBtn = document.createElement("button");
    private speedSel = document.createElement("select");
    private elementSel = document.createElement("select");
    private rafId = 0;
    private lastTime = 0;
    private acc = 0;
    private speed = 1;
    private pending: SimulationCommand[] = [];

    constructor(private stepFn: (stepMS: number, commands: SimulationCommand[]) => void, private stepMS: number) {
        Object.assign(this.el.style, {
            position: "fixed", left: "50%", bottom: "16px", transform: "translateX(-50%)",
            display: "flex", gap: "6px", alignItems: "center", padding: "6px",
            background: COLORS.hudBg, borderRadius: "8px", font: "12px monospace", color: COLORS.text,
            zIndex: "10", userSelect: "none",
        });
        const styleCtl = (e: HTMLElement) => Object.assign(e.style, {
            font: "12px monospace", color: COLORS.text, background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)", borderRadius: "5px", padding: "5px 10px",
            cursor: "pointer", minWidth: "72px",
        });
        [this.playBtn, this.stepBtn, this.speedSel, this.elementSel].forEach(styleCtl);

        for (const e of PICKABLE_ELEMENTS) {
            const opt = document.createElement("option");
            opt.value = String(e);
            opt.textContent = `${e} ${Element[e]}`;
            opt.style.background = COLORS.background;
            this.elementSel.appendChild(opt);
        }
        this.elementSel.title = "Display element";
        this.elementSel.addEventListener("change", () => {
            this.selectElement(Number(this.elementSel.value));
            this.elementSel.blur();
        });

        this.playBtn.title = "Play / pause (Space)";
        this.stepBtn.textContent = "Step ⏭";
        this.stepBtn.title = "Single step (→)";
        for (const s of SPEEDS) {
            const opt = document.createElement("option");
            opt.value = String(s.value);
            opt.textContent = s.label;
            opt.style.background = COLORS.background;
            this.speedSel.appendChild(opt);
        }
        this.speedSel.value = "1";
        this.speedSel.title = "Playback speed";

        this.playBtn.addEventListener("click", () => this.toggle());
        this.stepBtn.addEventListener("click", () => this.stepOnce());
        this.speedSel.addEventListener("change", () => { this.speed = Number(this.speedSel.value); this.acc = 0; });
        if (DEBUG) {
            window.addEventListener("keydown", this.onKey);
            this.el.append(this.playBtn, this.stepBtn, this.speedSel);
        }
        this.el.append(this.elementSel);
        document.body.appendChild(this.el);
        this.updateUi();

        this.selectElement(Element.Hydrogen);

        if (!DEBUG) this.play();
    }

    selectElement(e: Element): void {
        this.elementSel.value = String(e);
        this.issue({ type: "displayElement", ordinalNumber: e });
    }

    shiftElement(n: number): void {
        const i = PICKABLE_ELEMENTS.indexOf(Number(this.elementSel.value) as Element);
        const next = Math.min(PICKABLE_ELEMENTS.length - 1, Math.max(0, i + n));
        if (next !== i) this.selectElement(PICKABLE_ELEMENTS[next]);
    }

    get playing(): boolean {
        return this.rafId !== 0;
    }

    play(): void {
        if (this.playing) return;
        this.acc = 0;
        this.lastTime = performance.now();
        this.rafId = requestAnimationFrame(this.tick);
        this.updateUi();
    }

    pause(): void {
        cancelAnimationFrame(this.rafId);
        this.rafId = 0;
        this.updateUi();
    }

    toggle(): void {
        if (this.playing) this.pause(); else this.play();
    }

    stepOnce(): void {
        this.pause();
        this.doStep();
    }

    issue(command: SimulationCommand): void {
        this.pending.push(command);
        if (!this.playing) this.doStep();
    }

    private doStep(): void {
        const commands = this.pending;
        this.pending = [];
        this.stepFn(this.stepMS, commands);
    }

    dispose(): void {
        this.pause();
        window.removeEventListener("keydown", this.onKey);
        this.el.remove();
    }

    private tick = (now: number) => {
        const dt = Math.min(250, now - this.lastTime);
        this.lastTime = now;
        if (this.speed === Infinity) {
            const until = performance.now() + 12;
            do this.doStep(); while (performance.now() < until);
        } else {
            this.acc += dt * this.speed;
            let n = 0;
            while (this.acc >= this.stepMS && n < 1000) {
                this.doStep();
                this.acc -= this.stepMS;
                n++;
            }
            if (n === 1000) this.acc = 0;
        }
        this.rafId = requestAnimationFrame(this.tick);
    };

    private onKey = (e: KeyboardEvent) => {
        const t = e.target as HTMLElement | null;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
        if (e.code === "Space") {
            e.preventDefault();
            this.toggle();
        } else if (e.key === "ArrowRight" || e.key === ".") {
            e.preventDefault();
            this.stepOnce();
        }
    };

    private updateUi(): void {
        this.playBtn.textContent = this.playing ? "❚❚ Pause" : "▶ Play";
    }
}

export function attachGui(simulation: Simulation, options: CanvasRendererOptions = {}): CanvasRenderer {
    const stepMS = options.stepMS ?? 1000 / 60;
    const renderer = new CanvasRenderer({
        step: (ms, commands) => simulation.step(ms, commands),
        stepMS,
        ...options,
    });
    renderer.start(() => simulation.state.simState);
    return renderer;
}

function childrenOf(obj: SimulationObject): Map<number, SimulationObject> {
    return (obj as unknown as { children?: Map<number, SimulationObject> }).children ?? new Map();
}

function fmt(n: number): string {
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
}
