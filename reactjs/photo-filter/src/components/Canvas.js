import { useRef, useEffect, useState } from "react"

export default function Canvas({ imageRef, imageSrc }) {
    const canvasRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = 500
        canvas.height = 500
        const context = canvas.getContext('2d')
        console.log(imageRef.current, imageSrc);
        setIsDrawing(true)
        if (imageRef.current) {
            console.log(context);
            context.drawImage(imageRef.current, 10, 10,1000,1000)
        }
        setIsDrawing(false)
    }, [imageSrc, imageRef])
    if (isDrawing) {
        return <div>draw...</div>
    }
    return (
        <canvas ref={canvasRef}></canvas>
    )
}