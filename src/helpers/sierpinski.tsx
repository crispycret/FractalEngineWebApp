import { off } from "process"
import { useState } from "react"
import { SierpinskiInterface } from "./interfaces"




export const Sierpinski = () => {

    let fractalType = "Sierpinski"

    let canvasWidth = 1000
    let canvasHeight = 1000

    const setCanvasWidth = (value: number) => {canvasWidth = value}
    const setCanvasHeight = (value: number) => {canvasHeight = value}

    const MAX_DEPTH = 5
    const STROKE_WIDTH = 6

    let maxDepth = MAX_DEPTH
    let strokeWidth = STROKE_WIDTH
    
    const setMaxDepth = (depth: number) => {maxDepth=depth; save()}
    const setStrokeWidth = (width: number) => {strokeWidth=width; save(); }


    const save = () => {
        localStorage.setItem("sierpinski_maxDepth", maxDepth.toString())        
        localStorage.setItem("sierpinski_strokeWidth", strokeWidth.toString())        
    }

    const load = () => {
        let temp = localStorage.getItem("sierpinski_maxDepth")
        maxDepth = temp == null ? MAX_DEPTH : Number.parseInt(temp)

        temp = localStorage.getItem("sierpinski_strokeWidth")
        strokeWidth = temp == null ? MAX_DEPTH : Number.parseInt(temp)
    }


    let rainbowColors = new Array(16).fill(0).map(
        (_,i) => i === 0 ? '#000' : `#${((1<<24) * Math.random() | 0).toString(16)}`
    )
    let gradient: CanvasGradient;
    
    function random(min: number, max: number) {
        return Math.floor((Math.random())*(max-min+1))+min;
    }

    const createTriangle = (pos: number[], sidelen: number, ctx: any, color: string|CanvasGradient) => {
        ctx.strokeStyle = color
        ctx.lineWidth = strokeWidth
        ctx.beginPath();
        ctx.moveTo(...pos); // go to the left vertex
      
        // note that (0,0) in canvas is the top left, so 'up' on the vertical component would use substraction.
        ctx.lineTo(pos[0] + sidelen / 2, pos[1] - sidelen * Math.sin(Math.PI/3)); // draw line from left vertex to top vertex
        ctx.lineTo(pos[0] + sidelen, pos[1]); // draw line from top vertex to right vertex
        ctx.lineTo(...pos); // draw line from right vertex back to left vertex
        ctx.closePath();

        ctx.stroke();
        // ctx.fill(); // fill triangle
      };

      const createSierpinskiTriangle = (pos: number[], sidelen: number, depth: number, ctx: CanvasRenderingContext2D) => {
        const innerTriangleSidelen = sidelen / 2; // side length of inner triangles is half the side length of the outer triangle
        const innerTrianglesPositions = [
          pos,
          [ pos[0] + innerTriangleSidelen, pos[1] , ],
          [ pos[0] + innerTriangleSidelen / 2, pos[1] - Math.sin(Math.PI/3) * innerTriangleSidelen ]
        ]; // these positions are the same as what was used in the createTriangle function
      

        if(depth == 0) {
          innerTrianglesPositions.forEach((trianglePosition, i) => {
            createTriangle(trianglePosition, innerTriangleSidelen, ctx, gradient);
            // createTriangle(trianglePosition, innerTriangleSidelen, ctx, rainbowColors[random(0,rainbowColors.length-1)]);

          });
        } else {
          innerTrianglesPositions.forEach((trianglePosition) => {
            createSierpinskiTriangle(trianglePosition, innerTriangleSidelen, depth - 1, ctx);
          });
        }
      }


    function draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {

        // To DO: Dynamically calculate the padding to center the sierpinski triangle
        // Do this by taking the size of the canvas, the first line length and determine 
        // where the first point should start from.

        // canvas.width = canvasWidth
        // canvas.height = canvasHeight

        let temp = canvas.parentElement !== undefined  && canvas.parentElement !== null ? canvas.parentElement.clientWidth : canvas.width 
        canvas.width = temp
        canvas.height = temp

        gradient = ctx.createLinearGradient(canvasHeight/2, 0, canvasHeight, canvasWidth );
        gradient.addColorStop(0, "magenta");
        gradient.addColorStop(0.5 ,"blue");
        gradient.addColorStop(1.0, "red");

        // Shave some of the height off of the canvas that will always remain empty due to how the
        // the triangle is created
        let newH = canvas.height - (canvas.height * .115)
        canvas.height = newH

        let offset = 0.05
        let startX = canvas.width * offset
        let startY = canvas.height - (canvas.height * offset * 1.5 )
        let lineLength = canvas.width - (canvas.width * offset * 2)

        createSierpinskiTriangle([startX, startY], lineLength, maxDepth, ctx);

        // createSierpinskiTriangle([0, canvasHeight], canvasWidth, maxDepth, ctx);


    }

    return {
        fractalType,
        draw,
        load,
        save,

        canvasWidth, setCanvasWidth,
        canvasHeight, setCanvasHeight,

        maxDepth, setMaxDepth,
        strokeWidth, setStrokeWidth
        
    } as SierpinskiInterface

}


export default Sierpinski;


