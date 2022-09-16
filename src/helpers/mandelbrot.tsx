import { Complex, MandelbrotInterface, Point, Set } from "./interfaces"
import {createRandomColors} from "./utils"





export const Mandelbrot = () => {

    let fractalType = "Mandelbrot"

    let canvasWidth = 1000 
    let canvasHeight = 1000

    const setCanvasWidth = (value: number) => {canvasWidth = value}
    const setCanvasHeight = (value: number) => {canvasHeight = value}

    const MAX_ITERATIONS = 80
    const ESCAPE_RAIDUS = 2.0
    const REAL = {start: -2, end: 1} as Set
    const IMAGINARY = {start: -1, end: 1} as Set
    const COLOR_RANGE = 32
    const ZOOM = 0.1

    let maxIterations = 80
    let escapeRadius = 2.0
    let real = {start: -2, end: 1} as Set
    let imaginary = {start: -1, end: 1} as Set
    let colorRange = 32
    let zoom = 0.1

    let rainbowColors = createRandomColors(colorRange);

    const setMaxIterations = (value: number) => {maxIterations = value; save()}
    const setEscapeRadius = (value: number) => {escapeRadius = value; save()}
    const setReal = (value: Set) => {real = value; save()}
    const setImaginary = (value: Set) => {imaginary = value; save()}
    const setColorRange = (value: number) => {colorRange = value; save()}
    const setZoom = (value: number) => {zoom = value; save()}

    /* Put the settings in local storage */
    const save = () => {
        console.log("SAVE MANDELBROT")
        localStorage.setItem("mandelbrot_maxIterations", maxIterations.toString())
        localStorage.setItem("mandelbrot_escapeRadius", escapeRadius.toString())
        localStorage.setItem("mandelbrot_realStart", real.start.toString())
        localStorage.setItem("mandelbrot_realEnd", real.end.toString())
        localStorage.setItem("mandelbrot_imaginaryStart", imaginary.start.toString())
        localStorage.setItem("mandelbrot_imaginaryEnd", imaginary.end.toString())
        localStorage.setItem("mandelbrot_colorRange", colorRange.toString())
        localStorage.setItem("mandelbrot_zoom", zoom.toString())
    }


    
    const load = () => {

        console.log("LOAD MANDELBROT") 
        let temp = localStorage.getItem("mandelbrot_maxIterations")
        maxIterations = temp == null ? MAX_ITERATIONS : Number.parseInt(temp)

        temp = localStorage.getItem("mandelbrot_escapeRadius") 
        escapeRadius = temp == null ? ESCAPE_RAIDUS : Number.parseFloat(temp)

        temp = localStorage.getItem("mandelbrot_realStart") 
        real.start = temp == null ? REAL.start : Number.parseFloat(temp)

        temp = localStorage.getItem("mandelbrot_realEnd") 
        real.end = temp == null ? REAL.end : Number.parseFloat(temp)
        
        temp = localStorage.getItem("mandelbrot_imaginaryStart") 
        imaginary.start = temp == null ? IMAGINARY.start : Number.parseFloat(temp)
        
        temp = localStorage.getItem("mandelbrot_imaginaryEnd") 
        imaginary.end = temp == null ? IMAGINARY.end : Number.parseFloat(temp)
                
        temp = localStorage.getItem("mandelbrot_colorRange") 
        colorRange = temp == null ? COLOR_RANGE : Number.parseInt(temp)

        temp = localStorage.getItem("mandelbrot_zoom") 
        zoom = temp == null ? ZOOM : Number.parseFloat(temp)
        
    }



    const init = () => {
        rainbowColors = createRandomColors(colorRange)
    }

    init()


    /**
     * 
     * @param c -> Complex Number: c.r -> Real Number, c.i -> Imaginary Number
     * @returns [iterations -> Number, inMandelbrot -> Boolean]
     */
    const inMandelbrot = (c: Complex) => {
        let n = 0
        let z: Point = {x:0, y:0}
        let p: Point
        let d: number
        do {
            p = {
                x: Math.pow(z.x, 2) - Math.pow(z.y, 2), 
                y: 2 * z.x * z.y
            }
            z = {
                x: p.x + c.r,
                y: p.y + c.i
            }
            d = Math.sqrt(Math.pow(z.x, 2) + Math.pow(z.y, 2))
            n++
        } while (d <= escapeRadius && n < maxIterations)
        return [n, d <= escapeRadius]
    } 


    function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {

        if (canvas === null) return
        if (ctx === null) return

        canvas.width = canvas.parentElement !== undefined  && canvas.parentElement !== null ? canvas.parentElement.clientWidth : canvas.width 
        canvas.height = canvas.parentElement !== undefined  && canvas.parentElement !== null ? canvas.parentElement.clientHeight : canvas.height 

        for (let i=0; i < canvas.width; i++) {
            for (let j=0; j< canvas.height; j++) {

                let complex = {
                    r: real.start + (i / canvas.width) * (real.end - real.start),
                    i: imaginary.start + (j / canvas.height) * (imaginary.end - imaginary.start)
                }

                const [n, isMandlebrot] = inMandelbrot(complex)
                let colorIdx = isMandlebrot ? 0 : (n as number % rainbowColors.length-1)+1
                ctx.fillStyle = rainbowColors[colorIdx]
                ctx.fillRect(i, j, 1, 1)
            }
        }
    }



    return {
        fractalType,
        draw,
        save,
        load,
        canvasWidth, setCanvasWidth,
        canvasHeight, setCanvasHeight,

        maxIterations, setMaxIterations,
        escapeRadius, setEscapeRadius,
        zoom, setZoom,
        real, setReal, 
        imaginary, setImaginary,
        colorRange, setColorRange
    } as MandelbrotInterface
}



export default Mandelbrot