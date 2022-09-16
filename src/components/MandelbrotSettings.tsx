import { useEffect, useState, useRef} from 'react';
import { Container, Row, Col, InputGroup, Form, FormControl, FloatingLabel } from 'react-bootstrap';
import { MandelbrotInterface, SierpinskiInterface } from '../helpers/interfaces';
import Mandelbrot from "../helpers/mandelbrot";
import { toSignedNumber, toUnsignedNumber } from '../helpers/utils';



// export const MandelbrotSettings = (props: any) => {
export const MandelbrotSettings = (props: any) => {
    
    console.log("START HERE???")
    const mandelbrot = props.mandelbrot as MandelbrotInterface
    const mandelbrot1 = props.mandelbrot as MandelbrotInterface
    const mandelbrot2 = props.mandelbrot as MandelbrotInterface
    const mandelbrot3 = props.mandelbrot as MandelbrotInterface
    const mandelbrot4 = props.mandelbrot as MandelbrotInterface
    console.log("END HERE???")

    const [canvasWidth, setCanvasWidth] = useState(Number(1000).toString())
    const [canvasHeight, setCanvasHeight] = useState(Number(1000).toString())

    const [maxIterations, setMaxIterations] = useState(mandelbrot.maxIterations.toString());
    const [escapeRadius, setEscapeRadius] = useState(mandelbrot.escapeRadius.toString());
    const [realStart, setRealStart] = useState(mandelbrot.real.start.toString());
    const [realEnd, setRealEnd] = useState(mandelbrot.real.end.toString());
    const [imaginaryStart, setImaginaryStart] = useState(mandelbrot.imaginary.start.toString());
    const [imaginaryEnd, setImaginaryEnd] = useState(mandelbrot.imaginary.end.toString());

    const [zoom, setZoom] = useState(mandelbrot.zoom.toString());


    const onChangeCanvasWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = toUnsignedNumber(e.currentTarget.value)
        let newValue = Number.parseInt(v)
        setCanvasWidth(newValue.toString())
        mandelbrot.setCanvasWidth(newValue)
    }
    
    const onChangeCanvasHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = toUnsignedNumber(e.currentTarget.value)
        let newValue = Number.parseInt(v)
        setCanvasHeight(newValue.toString())
        mandelbrot.setCanvasHeight(newValue)
    }

    const onChangeMaxIterations = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = toUnsignedNumber(e.currentTarget.value)
        const newValue = Number.parseInt(v)
        setMaxIterations(newValue.toString())
        mandelbrot.setMaxIterations(newValue)
    }

    const onChangeEscapeRadius = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = toUnsignedNumber(e.currentTarget.value)
        const newValue = Number.parseInt(v)
        setEscapeRadius(v)
        mandelbrot.setEscapeRadius(newValue)
    }

    const onChangeRealStart = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = toSignedNumber(e.currentTarget.value)
        const newValue = Number.parseFloat(v)
        setRealStart(v)
        mandelbrot.setReal({start:newValue, end:mandelbrot.real.end})
    }
    
    const onChangeRealEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = toSignedNumber(e.currentTarget.value)
        const newValue = Number.parseFloat(v)
        setRealEnd(v)
        mandelbrot.setReal({start:mandelbrot.real.start, end:newValue})
    }

    const onChangeImaginaryStart = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = toSignedNumber(e.currentTarget.value)
        setImaginaryStart(v)
        const newValue = Number.parseFloat(v)
        mandelbrot.setImaginary({start:newValue, end:mandelbrot.imaginary.end})
    }
    
    const onChangeImaginaryEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = toSignedNumber(e.currentTarget.value)
        setImaginaryEnd(v)
        const newValue = Number.parseFloat(v)
        mandelbrot.setImaginary({start:mandelbrot.imaginary.start, end:newValue})
    }
    
    const onChangeZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = toUnsignedNumber(e.currentTarget.value)
        setZoom(v)
        const newValue = Number.parseFloat(v)
        mandelbrot.setZoom(newValue)
    }
    

    return (
        <Container className='mx-0 px-0'>

            {/* <Row className='mx-0 py-1'>
                <InputGroup.Text className='my-0 py-0'>Canvas</InputGroup.Text>
            </Row>

            <Row className='mx-0 py-1'>
                <Col className='col-6 mx-0 p-0 pe-1'>
                    <InputGroup.Text className='mb-1 py-0'>Width</InputGroup.Text>
                    <Form.Control className='py-0' value={canvasWidth}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeCanvasWidth(e as any)}}
                    />
                </Col>
                <Col className='col-6 mx-0 p-0 ps-1'>
                    <InputGroup.Text className='mb-1 py-0'>Height</InputGroup.Text>
                    <Form.Control className='py-0' value={canvasHeight}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeCanvasHeight(e as any)}}
                    />
                    </Col>
            </Row> */}



            <Row className='mx-0 py-1'>
                <InputGroup.Text className='my-0 py-0'>Real</InputGroup.Text>
            </Row>




            <Row className='mx-0 py-1'>
                <Col className='col-6 mx-0 p-0 pe-1'>
                    <InputGroup.Text className='mb-1 py-0'>Start</InputGroup.Text>
                    <Form.Control className='py-0' 
                        value={realStart}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeRealStart(e as any)}}
                    />
                </Col>
                <Col className='col-6 mx-0 p-0 ps-1'>
                    <InputGroup.Text className='mb-1 py-0'>End</InputGroup.Text>
                    <Form.Control className='py-0' value={realEnd}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeRealEnd(e as any)}}
                    />
                    </Col>
            </Row>




            <Row className='mx-0 py-1'>
                <InputGroup.Text className='my-0 py-0'>Imaginary</InputGroup.Text>
            </Row>


            

            <Row className='mx-0 py-1'>
                <Col className='col-6 mx-0 p-0 pe-1'>
                    <InputGroup.Text className='mb-1 py-0'>Start</InputGroup.Text>
                    <Form.Control className='py-0' 
                        value={imaginaryStart}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeImaginaryStart(e as any)}}
                    />
                </Col>
                <Col className='col-6 mx-0 p-0 ps-1'>
                    <InputGroup.Text className='mb-1 py-0'>End</InputGroup.Text>
                    <Form.Control className='py-0' value={imaginaryEnd}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeImaginaryEnd(e as any)}}
                    />
                    </Col>
            </Row>





            <Row className='mx-0 py-1'>
                <InputGroup.Text className='my-0 py-0'>Settings</InputGroup.Text>
            </Row>

            <Row className='mx-0 py-1'>
                <Col className='col-6 mx-0 p-0 pe-1'>
                    <InputGroup.Text className='mb-1 py-0'>Iterations</InputGroup.Text>
                    <Form.Control className='py-0' 
                        value={maxIterations}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeMaxIterations(e as any)}}
                    />
                </Col>
                <Col className='col-6 mx-0 p-0 ps-1'>
                    <InputGroup.Text className='mb-1 py-0'>Bounds</InputGroup.Text>
                    <Form.Control className='py-0' value={escapeRadius}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeEscapeRadius(e as any)}}
                    />
                    </Col>
            </Row>



            


{/* 

                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Max Iterations</InputGroup.Text>
                            <Form.Control
                                placeholder="" aria-label="escapeRadius"
                                aria-describedby="basic-addon1"
                                value={maxIterations}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeMaxIterations(e as any)}}
                            />
                        </InputGroup>
                    </Col>

                    <Col>
                    <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Escape Radius</InputGroup.Text>
                            <Form.Control
                                placeholder="" aria-label="escapeRadius"
                                aria-describedby="basic-addon1"
                                value={escapeRadius}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeEscapeRadius(e as any)}}
                            />
                        </InputGroup>
                    </Col>
                </Row>
          

          
          <Row>
                <Col/>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Real Start</InputGroup.Text>
                        <Form.Control
                            placeholder="" aria-label="canvasWidth"
                            aria-describedby="basic-addon1"
                            value={realStart}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeRealStart(e as any)}}
                        />
                    </InputGroup>
                </Col>

                <Col>
                <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Real End</InputGroup.Text>
                        <Form.Control
                            placeholder="" aria-label="escapeRadius"
                            aria-describedby="basic-addon1"
                            value={realEnd}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeRealEnd(e as any)}}
                        />
                    </InputGroup>
                </Col>
                <Col/>
          </Row>
          

          
          <Row>
              <Col/>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Imaginary Start</InputGroup.Text>
                        <Form.Control
                            placeholder="" aria-label="canvasWidth"
                            aria-describedby="basic-addon1"
                            value={imaginaryStart}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeImaginaryStart(e as any)}}
                        />
                    </InputGroup>
                </Col>

                <Col>
                <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Imaginary End</InputGroup.Text>
                        <Form.Control
                            placeholder="" aria-label="escapeRadius"
                            aria-describedby="basic-addon1"
                            value={imaginaryEnd}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeImaginaryEnd(e as any)}}
                        />
                    </InputGroup>
                </Col>
                <Col/>
          </Row>
          

            <Row>
                <Col/>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Zoom</InputGroup.Text>
                        <Form.Control
                            placeholder="" aria-label="escapeRadius"
                            aria-describedby="basic-addon1"
                            value={zoom}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeZoom(e as any)}}
                        />
                    </InputGroup>
                </Col>
                <Col/>
            </Row>
 */}

        </Container>
    );

}