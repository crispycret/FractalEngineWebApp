import { useState } from "react"
import { SierpinskiInterface } from "./interfaces"




export const Sierpinski = () => {

    let fractalType = "Sierpinski"

    let canvasWidth = 1000
    let canvasHeight = 1000

    const setCanvasWidth = (value: number) => {canvasWidth = value}
    const setCanvasHeight = (value: number) => {canvasHeight = value}

    let maxDepth = 10


    const save = () => {
        
    }
    
    const load = () => {
        
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

        

        canvas.width = canvasWidth
        canvas.height = canvasHeight

        gradient = ctx.createLinearGradient(canvasHeight/2, 0, canvasHeight, canvasWidth );
        gradient.addColorStop(0, "magenta");
        gradient.addColorStop(0.5 ,"blue");
        gradient.addColorStop(1.0, "red");

        let startY2 = canvasHeight - (canvasHeight * 0.25)
        let startY = canvasHeight - (canvasHeight * 0.10)
        createSierpinskiTriangle([0, startY], canvasHeight, maxDepth, ctx);
        // createSierpinskiTriangle([0, canvasHeight], canvasHeight, maxDepth, ctx);
        // createSierpinskiTriangle([0, 1000], 1000, 5, ctx);


    }

    return {
        fractalType,
        draw,
        load,
        save,
        canvasWidth, setCanvasWidth,
        canvasHeight, setCanvasHeight
    } as SierpinskiInterface

}


export default Sierpinski;


