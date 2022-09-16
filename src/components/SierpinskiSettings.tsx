import { useEffect, useState } from "react";
import { SierpinskiInterface } from "../helpers/interfaces";



export const SierpinskiSettings  = (props: any) => {

    const sierpinski = props.sierpinski as SierpinskiInterface

    const [canvasWidth, setCanvasWidth] = useState(1000)
    const [canvasHeight, setCanvasHeight] = useState(1000)
    
    const onChangeCanvasWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.value == "") e.currentTarget.value = "0"
        let newSize = Number.parseInt(e.currentTarget.value)

        // sierpinski.canvasWidth = newSize
        setCanvasWidth(newSize)
        sierpinski.setCanvasWidth(newSize)
        setCanvasHeight(newSize)
        sierpinski.setCanvasHeight(newSize)
    }


    useEffect(() => {
    }, [])


    return (
        <div>
            <div>
                <label>Canvas Width</label>
                <input type="text" id="canvas-width" value={canvasWidth} onChange={e => {onChangeCanvasWidth(e)}} />
            </div>
            <div>
                <label>Canvas Height</label>
                <input type="text" id="canvas-height" value={canvasHeight} disabled={true} />
            </div>
        </div>
    )
}


export default SierpinskiSettings;