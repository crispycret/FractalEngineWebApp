import { Complex, MandelbrotInterface, Point, Set } from "./interfaces"





export const Mandelbrot = () => {

    let fractalType = "Mandelbrot"

    let canvasWidth = 1000 
    let canvasHeight = 1000

    const setCanvasWidth = (value: number) => {canvasWidth = value}
    const setCanvasHeight = (value: number) => {canvasHeight = value}


    let maxIterations = 80
    let escapeRadius = 2.0
    let real = {start: -2, end: 1} as Set
    let imaginary = {start: -1, end: 1} as Set
    let colorRange = 32
    let zoom = 0.1

    const setMaxIterations = (value: number) => {maxIterations = value}
    const setEscapeRadius = (value: number) => {escapeRadius = value}
    const setReal = (value: Set) => {real = value}
    const setImaginary = (value: Set) => {imaginary = value}
    const setColorRange = (value: number) => {colorRange = value}
    const setZoom = (value: number) => {zoom = value}

    
    let rainbowColors = new Array(colorRange).fill(0).map(
        (_,i) => i === 0 ? '#000' : `#${((1<<24) * Math.random() | 0).toString(16)}`
    )

    const createColorSchema = () => {
        let rainbowColors = new Array(colorRange).fill(0).map(
            (_,i) => i === 0 ? '#000' : `#${((1<<24) * Math.random() | 0).toString(16)}`
        )    
    }


    const init = () => {
        createColorSchema();
    }


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

        console.log(canvas.parentElement?.clientWidth)
        console.log(canvas.parentElement?.clientHeight)

        canvas.width = canvas.parentElement !== undefined  && canvas.parentElement !== null ? canvas.parentElement.clientWidth : canvas.width 
        canvas.height = canvas.parentElement !== undefined  && canvas.parentElement !== null ? canvas.parentElement.clientHeight : canvas.height 
        
        // canvas.width = canvasWidth
        // canvas.height = canvasHeight

        init()

        if (canvas === null) return
        if (ctx === null) return

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