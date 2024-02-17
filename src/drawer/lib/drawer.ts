import TopText from "./top_text";
import BottomText from "./bottom_text";




export default class Drawer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    topText: TopText;
    bottomText: any;
    useTransparent: boolean;

    dragging: boolean;
    dragStartCursorPos: number;
    dragStartBottomTextPos: number;

    font: string
    horizMargin: number
    vertMargin: number

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this), false);
        this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this), false);
        this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this), false);
        this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this), false);
        this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this), false);


        this.ctx = canvas.getContext('2d');
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.topText = new TopText(this.ctx);
        this.bottomText = new BottomText(this.ctx);

        this.useTransparent = false;

        this.dragging = false;
        this.dragStartCursorPos = 0;
        this.dragStartBottomTextPos = 0;

        this.horizMargin = 30;
        this.vertMargin = 30;
    }

    draw(topText: string, bottomText: string, font: string) {
        this.font = font;
        this.topText.value = topText;
        this.bottomText.value = bottomText;
        this.refresh();
    }

    refresh() {
        this.clear();

        this.topText.font = this.font;
        this.bottomText.font = this.font;

        this.topText.draw();
        this.bottomText.draw();
    }

    clear() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (!this.useTransparent) {
            this.ctx.fillStyle = `white`;
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        } else {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }
    }

    onCursorDown(e: MouseEvent) {
        this.dragging = true;
        this.dragStartCursorPos = e.clientX;
        this.dragStartBottomTextPos = this.bottomText.x;
    }

    onCursorMove(e: MouseEvent) {
        if (this.dragging) {
            const dx = e.clientX - this.dragStartCursorPos;
            this.bottomText.x = this.dragStartBottomTextPos + dx;
            this.refresh();
        }

        const bottomTextTop = this.canvas.getBoundingClientRect().top + this.topText.y;
        const bottomTextBottom = this.canvas.getBoundingClientRect().top + this.canvas.height;
        if (bottomTextTop < e.clientY && e.clientY < bottomTextBottom) {
            document.body.style.cursor = "move";
        } else {
            document.body.style.cursor = "auto"
        }
    }

    onCursorUp(e: MouseEvent) {
        this.dragging = false;
        this.dragStartCursorPos = 0;
        this.dragStartBottomTextPos = 0;
    }

    onCursorLeave(e: MouseEvent) {
        if (this.dragging) {
            this.dragging = false;
            this.dragStartCursorPos = 0;
            this.dragStartBottomTextPos = 0;
        }
        document.body.style.cursor = "auto"
    }

    onMouseDown(e: MouseEvent) {
        this.onCursorDown(e);
    };

    onMouseMove(e: MouseEvent) {
        this.onCursorMove(e);
    };

    onMouseUp(e: MouseEvent) {
        this.onCursorUp(e);
    };

    onMouseLeave(e: MouseEvent) {
        this.onCursorLeave(e);
    };

    onTouchStart(e: TouchEvent) {
        e.preventDefault();
        let eMock = Object.assign({
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY
        }, e) as unknown as MouseEvent;
        this.onCursorDown(eMock);
    };

    onTouchMove(e: TouchEvent) {
        e.preventDefault();
        let eMock = Object.assign({
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY
        }, e) as unknown as MouseEvent;
        this.onCursorMove(eMock);
    };

    onTouchEnd(e: TouchEvent) {
        e.preventDefault();
        let eMock = Object.assign({
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY
        }, e) as unknown as MouseEvent;
        this.onCursorUp(eMock);
    };

    /// https://stackoverflow.com/a/22267731
    cropImageFromCanvas(ctx: CanvasRenderingContext2D) {
        let canvas = ctx.canvas;
        let w = canvas.width;
        let h = canvas.height;

        let pix = { x: [], y: [] };

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        let x: number;
        let y: number;
        let index: number;

        for (y = 0; y < h; y++) {
            for (x = 0; x < w; x++) {
                index = (y * w + x) * 4;

                let r = imageData.data[index + 0];
                let g = imageData.data[index + 1];
                let b = imageData.data[index + 2];
                let a = imageData.data[index + 3];
                let isWhite = r == 255 && g == 255 && b == 255;
                let isTransparent = a == 0;
                if (!isTransparent && (!isWhite)) {
                    pix.x.push(x);
                    pix.y.push(y);
                }
            }
        }
        pix.x.sort(function (a, b) { return a - b });
        pix.y.sort(function (a, b) { return a - b });
        var n = pix.x.length - 1;

        w = 1 + pix.x[n] - pix.x[0];
        h = 1 + pix.y[n] - pix.y[0];
        var cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);


        let canvasNew = document.createElement('canvas');
        canvasNew.width = w + this.horizMargin * 2;
        canvasNew.height = h + this.vertMargin * 2;

        let ctxNew = canvasNew.getContext("2d")
        

        if (!this.useTransparent) {
            ctxNew.fillStyle = 'white';
            ctxNew.fillRect(0, 0, ctxNew.canvas.width, ctxNew.canvas.height);
        } else {
            ctxNew.clearRect(0, 0, ctxNew.canvas.width, ctxNew.canvas.height);
        }

        ctxNew.putImageData(cut, this.horizMargin, this.vertMargin);

        return canvasNew;
    }

    createCroppedCanvas() {
        return this.cropImageFromCanvas(this.ctx, 30, 30);
    }

    saveImage() {
        const canvas = this.createCroppedCanvas();

        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.setAttribute("download", "5000choyen.png");

        document.body.appendChild(a);
        a.click();
    }

    openImage() {
        const canvas = this.createCroppedCanvas();
        let contentURI = canvas.toDataURL();

        // https://stackoverflow.com/a/27798235
        let image = new Image();
        image.src = contentURI;

        let w = window.open("");
        w.document.write(image.outerHTML);
    }

    openImageDataURL() {
        const canvas = this.createCroppedCanvas();
        let contentURI = canvas.toDataURL();
        window.open(contentURI);
    }

}




