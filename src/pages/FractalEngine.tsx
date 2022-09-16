import { useEffect, useRef, useState} from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

import { CallBackProps } from "../helpers/interfaces";
import {FractalEngineSettings } from "../components/FractalEngineSettings";





export const FractalEngine = () => {

    let canvasRef = useRef<HTMLCanvasElement>(null);
    let ctx: CanvasRenderingContext2D;

    let generateCallback = (cavnas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {console.log("DEFAULT")};

    function setGenerateCallback(callback: (cavnas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {}) {
        generateCallback = callback;
    }


    const init = () => {
        if (canvasRef.current === null || canvasRef.current == undefined) return;
        
        let _ctx = canvasRef.current.getContext('2d');
        if (_ctx === null) return;
        ctx = _ctx
    }

    useEffect(() => {
        init()
    }, [])

    let props = {
        setGenerateCallback
    } as CallBackProps;

    const generate = () => {
        if (ctx === null) return
        if (canvasRef.current === null) return
        canvasRef.current.focus()
        clearCanvas(canvasRef.current, ctx)
        generateCallback(canvasRef.current, ctx)
    }

    const clearCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        ctx.save()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.restore()
    }

    const GenerateButton = <Button onClick={e => generate()}> Generate </Button>


    return (
        <div>

            <Row className="m-0" style={{backgroundColor: 'green', minHeight: '100vh'}}>
                
                <Col style={{backgroundColor: 'blue'}} className='col-2 mx-0 px-1'>
                    <Row className='my-1 mx-0 px-1'> <FractalEngineSettings {...props} />  </Row>
                    <Row className='my-1 mx-0 px-1'> { GenerateButton } </Row>
                </Col>

                <Col style={{backgroundColor: ''}} className='col-10 mx-0 px-0'>
                    <canvas id='myCanvas' ref={canvasRef}/>
                </Col>

            </Row>

        </div>
    )
}


export default FractalEngine;