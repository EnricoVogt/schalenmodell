let id = 0;
function next() {
    id++
    return id;
}

export const idGenerator = (() => ({next}))()

export const angle: any = (a: number) => a * Math.PI / 180;
export const getPosOnCircle = (r: number, a: number) => {
    const x = r * Math.cos(angle(a));
    const y = r * Math.sin(angle(a));
    return [x, y]
}

export const randomPositionInCircle = (radius: number) => {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * radius;

    return [Math.cos(angle) * r, Math.sin(angle) * r]
}
