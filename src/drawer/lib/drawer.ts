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
    
    saveImage() {
        const width = Math.max(this.topText.x + this.topText.w, this.bottomText.x + this.bottomText.w);
        const height = this.ctx.canvas.height;
    
        const data = this.ctx.getImageData(0, 0, width, height);
        const canvas = document.createElement('canvas');
        canvas.width = data.width;
        canvas.height = data.height;
    
        const ctx = canvas.getContext('2d');
        ctx.putImageData(data, 0, 0);
    
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.setAttribute("download", "5000choyen.png");
    
        document.body.appendChild(a);
        a.click();
    }
    
    openImage() {
        let contentURI = this.canvas.toDataURL()
        window.open(contentURI);
    }
    
}




