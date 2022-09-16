import { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup, Form } from "react-bootstrap";
import { SierpinskiInterface } from "../helpers/interfaces";
import { toSignedNumber, toUnsignedNumber } from "../helpers/utils";



export const SierpinskiSettings  = (props: any) => {

    const sierpinski = props.sierpinski as SierpinskiInterface

    const [canvasWidth, setCanvasWidth] = useState(1000)
    const [canvasHeight, setCanvasHeight] = useState(1000)
    
    const [depth, setDepth] = useState(sierpinski.maxDepth.toString())
    const [strokeWidth, setStrokeWidth] = useState(sierpinski.strokeWidth.toString())
    

    
    const onChangeCanvasWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.value == "") e.currentTarget.value = "0"
        let newSize = Number.parseInt(e.currentTarget.value)

        // sierpinski.canvasWidth = newSize
        setCanvasWidth(newSize)
        setCanvasHeight(newSize)
        sierpinski.setCanvasWidth(newSize)
        sierpinski.setCanvasHeight(newSize)
    }

    const onChangeDepth = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = toUnsignedNumber(e.currentTarget.value)
        const newValue = Number.parseInt(v)
        setDepth(newValue.toString())
        sierpinski.setMaxDepth(newValue)
    }    
    
    const onChangeStrokeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = toUnsignedNumber(e.currentTarget.value)
        const newValue = Number.parseInt(v)
        setStrokeWidth(newValue.toString())
        sierpinski.setStrokeWidth(newValue)
    }


    useEffect(() => {
    }, [])


    return (
        <Container className='mx-0 px-0'>

            <Row className='mx-0 py-1'>
                <InputGroup.Text className='my-0 py-0'>Settings</InputGroup.Text>
            </Row>

            <Row className='mx-0 py-1'>
            <Col className='col-6 mx-0 p-0 pe-1'>
                    <InputGroup.Text className='mb-1 py-0'>Depth</InputGroup.Text>
                    <Form.Control className='py-0' 
                        value={depth}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeDepth(e as any)}}
                    />
                </Col>
                <Col className='col-6 mx-0 p-0 pe-1'>
                    <InputGroup.Text className='mb-1 py-0'>Stroke</InputGroup.Text>
                    <Form.Control className='py-0' 
                        value={strokeWidth}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {onChangeStrokeWidth(e as any)}}
                    />
                </Col>
            </Row>

        </Container>
    )
}


export default SierpinskiSettings;