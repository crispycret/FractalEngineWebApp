import { useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'

import { FractalInterface } from '../helpers/interfaces';

import { MandelbrotSettings } from './MandelbrotSettings';
import Mandelbrot from '../helpers/mandelbrot';

import { Sierpinski } from '../helpers/sierpinski';
import { SierpinskiSettings } from './SierpinskiSettings';

import { CallBackProps } from '../pages/FractalEngine';




// const mandelbrot = ;
// const sierpinski = ();



export const FractalEngineSettings = (props: CallBackProps) => {

    const fractalNames = [
        'Mandelbrot', 'Sierpinski'
    ]
    const fractals = [
        Mandelbrot(),
        Sierpinski()
    ]
    const fractalSettings = [
        <MandelbrotSettings mandelbrot={fractals[0]} />,
        <SierpinskiSettings sierpinski={fractals[1]} />,
    ]

    const [selectedFractalIdx, setSelectedFractalIdx] = useState(0);
    const [fractalName, setFractalName] = useState(fractalNames[selectedFractalIdx]);
    const [fractal, setFractal] = useState<FractalInterface>(fractals[selectedFractalIdx]);


    // Create and fill and array of option elements with fractal attributes baked in. 
    const fractalOptions = []
    for (let i=0; i < fractalNames.length; i++) {
        let option = <option key={i} data-index={i}>{fractalNames[i]}</option>
        fractalOptions.push(option);
    }

    
    props.setGenerateCallback(fractals[selectedFractalIdx].draw);




    // When selecting a fractal to generate change the FractalEngine's generate method to the selected fractals draw method
    const onChangeFractal = (e: React.ChangeEvent<HTMLSelectElement>) => {

        let draw;
        
        let selectedName = e.currentTarget.value;
        let selectedIndex = e.target.selectedIndex

        setSelectedFractalIdx(selectedIndex)
        setFractal(fractals[selectedIndex])
        setFractalName(fractalNames[selectedIndex])        
        props.setGenerateCallback(fractals[selectedIndex].draw);
    }


    const FractalSelection = <Form.Select value={fractalName} className='mx-0 px-0' 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {onChangeFractal(e as any)}}>
                {fractalOptions}
        </Form.Select>


 

    return (
        <Col id="fractal-engine-settings" className='mx-0 px-0'>

            <Row className='mt-3 mb-1 mx-0 px-0'>
                {FractalSelection}
            </Row>
            
            <Row className='mx-0 px-0'>
                {fractalSettings[selectedFractalIdx]}
            </Row>

        </Col>

    );
    
}
