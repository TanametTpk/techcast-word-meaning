import { useRef, useEffect } from 'react';

interface Props {
    size?: number
    word: string
    type: string
    meaning: string
    theme?: 'light' | 'dark'
    font: string
    author?: string
}

interface TextElement {
    text: string
    x: number
    y: number
}

interface CanvasTextStyle {
    fontSize?: number
    fontFamily?: string
    color?: string
    textAlign?: CanvasTextAlign
    textBaseline?: CanvasTextBaseline
    weight?: string
}

interface RGBColor {
    r: number
    g: number
    b: number
}

type CanvasInfo = (canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => void

const Canvas = ({ size=800, word, type, meaning, theme='light', font, author }: Props) => {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvasElement = canvas.current;

        if (!canvasElement) return
        
        canvasElement.width = size;
        canvasElement.height = size;
    }, [size])

    useEffect(() => {
        drawGrid((canvasElement: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
            const height = canvasElement.height
            const wordSizeRatio: number = 0.1;
            const meaningSizeRatio: number = 0.04;
            const darkCode: RGBColor = {
                r: 255,
                g: 189,
                b: 89
            }
            const lightCode: RGBColor = {
                r: 122,
                g: 87,
                b: 29
            }
            let colorCode = theme === 'light' ? lightCode : darkCode;
            const color = `rgb(${colorCode.r}, ${colorCode.g}, ${colorCode.b})`

            writeWord({
                text: word ? word : "Word",
                x: height * 0.09,
                y: height / 2
            }, {
                fontSize: height * wordSizeRatio,
                textAlign: 'left',
                textBaseline: 'bottom',
                color,
                fontFamily: font
            })

            const typeLength: number = writeType({
                text: `(${type ? type : "type"})`,
                x: height * 0.09,
                y: height / 2 + height * 0.036
            }, {
                fontSize: height * meaningSizeRatio,
                textAlign: 'left',
                textBaseline: 'bottom',
                weight: 'italic bold',
                color,
                fontFamily: font
            });

            writeText({
                text: meaning ? meaning : "put your meaning here",
                x: height * 0.1,
                y: height / 2 + height * 0.036
            }, {
                fontSize: height * meaningSizeRatio,
                textAlign: 'left',
                textBaseline: 'bottom',
                color,
                fontFamily: font
            }, typeLength);

            if (author) {
                writeText({
                    text: `by ${author}`,
                    x: height * 0.605,
                    y: height * 0.905
                }, {
                    fontSize: height * meaningSizeRatio * 0.7,
                    textAlign: 'left',
                    textBaseline: 'bottom',
                    color,
                    fontFamily: font
                }, 0);
            }
        })
    }, [word, type, meaning, theme, size, font, author]);

    const drawGrid = (callback: CanvasInfo) => {
        const canvasElement = canvas.current
        if (!canvasElement) return

        const ctx = canvasElement.getContext("2d");
        if (!ctx) return
     
        const image = new Image();
        image.src = theme === 'light' ? "/templates/meaning-light.png" : "/templates/meaning-dark.png";
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvasElement.width, canvasElement.height)
            callback(canvasElement, ctx)
        }
    }

    const writeWord = (info: TextElement, style: CanvasTextStyle = {}) => {
        const { text, x, y } = info;

        const { 
            fontSize = 20,
            fontFamily = 'Arial',
            color = 'black',
            textAlign = 'left',
            textBaseline = 'top'
        } = style;

        const canvasElement = canvas.current
        if (!canvasElement) return

        const ctx = canvasElement.getContext("2d");
        if (!ctx) return

        var lineheight = 15 + fontSize;
        var lines = text.split('\n');

        for (var i = 0; i<lines.length; i++){
            ctx.beginPath();
            ctx.font = "bold " + fontSize + 'px ' + fontFamily;
            ctx.textAlign = textAlign;
            ctx.textBaseline = textBaseline;
            ctx.fillStyle = color;
            ctx.fillText(lines[i], x, y - (lines.length - 1) * lineheight + (i*lineheight));
            ctx.stroke();
        }
    }

    const writeType = (info: TextElement, style: CanvasTextStyle = {}) => {
        const { text, x, y } = info;
        const { fontSize = 20, fontFamily = 'Arial', color = 'black', textAlign = 'left', textBaseline = 'top', weight = 'normal' } = style;

        const canvasElement = canvas.current
        if (!canvasElement) return -1

        const ctx = canvasElement.getContext("2d");
        if (!ctx) return -1

        ctx.beginPath();
        ctx.font = weight + " " + fontSize + 'px ' + fontFamily;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        ctx.stroke();

        return ctx.measureText(text).width
    }

    const writeText = (info: TextElement, style: CanvasTextStyle = {}, skipFirstLine: number) => {
        const { text, x, y } = info;
        const { fontSize = 20, fontFamily = 'Arial', color = 'black', textAlign = 'left', textBaseline = 'top', weight = 'normal' } = style;

        const canvasElement = canvas.current
        if (!canvasElement) return -1

        const ctx = canvasElement.getContext("2d");
        if (!ctx) return -1

        const lineheight = 15 + fontSize;
        const lines = text.split('\n');

        for (let i = 0; i<lines.length; i++){
            ctx.beginPath();
            ctx.font = weight + " " + fontSize + 'px ' + fontFamily;
            ctx.textAlign = textAlign;
            ctx.textBaseline = textBaseline;
            ctx.fillStyle = color;
            ctx.fillText(
                lines[i],
                i === 0 ? x + skipFirstLine : x,
                y + (i*lineheight)
            );
            ctx.stroke();
        }

        return ctx.measureText(text).width
    }

    return (
        <div>
            <canvas ref={canvas}></canvas>
        </div>
    )
}

export default Canvas
