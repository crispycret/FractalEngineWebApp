
export interface Point {x: number, y: number}
export interface Complex {r: number, i: number}
export interface Set {start: number, end: number}



export interface FractalInterface {
    fractalType: string,
    save: () => void, 
    load: () => void,
    draw: (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {}
    canvasWidth: number,
    setCanvasWidth: (value: number) => void,
    canvasHeight: number
    setCanvasHeight: (value: number) => void
}


export interface MandelbrotInterface  extends FractalInterface{
    maxIterations: number,
    setMaxIterations: (value: number) => void,
    escapeRadius: number,
    setEscapeRadius: (value: number) => void,
    real: Set,
    setReal: (value: Set) => void,
    imaginary: Set,
    setImaginary: (value: Set) => void,
    colorRange: number,
    setColorRange: (value: number) => void,
    zoom: number
    setZoom: (value: number) => void,
}


export interface SierpinskiInterface extends FractalInterface{
}




