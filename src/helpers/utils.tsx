
export const toSignedNumber = (value: string) => {
    return value.replace(/[^-0-9.]/g, '');
}

export const toUnsignedNumber = (value: string) => {
    return value.replace(/[^0-9.]/g, '');
}


export const createRandomColors = (colorRange:number) => {
    return new Array(colorRange).fill(0).map(
        (_,i) => i === 0 ? '#000' : `#${((1<<24) * Math.random() | 0).toString(16)}`
    )    
}
