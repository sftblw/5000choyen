// export function draw_5000yen(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, text: string) {

//   ctx.setTransform(1, 0, 0, 1, 0, 0);
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.setTransform(1, 0, -0.4, 1, 0, 0);

//   var posx = 70;
//   var posy = 100;

//   // black color
//   {
//     ctx.strokeStyle = "#000";
//     ctx.lineWidth = 22;
//     ctx.strokeText(text, posx + 4, posy + 4);
//   }

//   // silver color
//   {
//     var grad = ctx.createLinearGradient(0, 24, 0, 122);
//     grad.addColorStop(0.0, 'rgb(0,15,36)');
//     grad.addColorStop(0.10, 'rgb(255,255,255)');
//     grad.addColorStop(0.18, 'rgb(55,58,59)');
//     grad.addColorStop(0.25, 'rgb(55,58,59)');
//     grad.addColorStop(0.5, 'rgb(200,200,200)');
//     grad.addColorStop(0.75, 'rgb(55,58,59)');
//     grad.addColorStop(0.85, 'rgb(25,20,31)');
//     grad.addColorStop(0.91, 'rgb(240,240,240)');
//     grad.addColorStop(0.95, 'rgb(166,175,194)');
//     grad.addColorStop(1, 'rgb(50,50,50)');
//     ctx.strokeStyle = grad;
//     ctx.lineWidth = 20;
//     ctx.strokeText(text, posx + 4, posy + 4);
//   }

//   // black color
//   {
//     ctx.strokeStyle = "#000000";
//     ctx.lineWidth = 16;
//     ctx.strokeText(text, posx, posy);
//   }

//   // gold color
//   {
//     var grad = ctx.createLinearGradient(0, 20, 0, 100);
//     grad.addColorStop(0, 'rgb(253,241,0)');
//     grad.addColorStop(0.25, 'rgb(245,253,187)');
//     grad.addColorStop(0.4, 'rgb(255,255,255)');
//     grad.addColorStop(0.75, 'rgb(253,219,9)');
//     grad.addColorStop(0.9, 'rgb(127,53,0)');
//     grad.addColorStop(1, 'rgb(243,196,11)');
//     ctx.strokeStyle = grad;
//     ctx.lineWidth = 10;
//     ctx.strokeText(text, posx, posy);
//   }

//   // black
//   ctx.lineWidth = 6;
//   ctx.strokeStyle = '#000';
//   ctx.strokeText(text, posx + 2, posy - 3);

//   // white
//   ctx.lineWidth = 6;
//   ctx.strokeStyle = '#FFFFFF';
//   ctx.strokeText(text, posx, posy - 3);

//   // red
//   {
//     var grad = ctx.createLinearGradient(0, 20, 0, 100);
//     grad.addColorStop(0, 'rgb(255, 100, 0)');
//     grad.addColorStop(0.5, 'rgb(123, 0, 0)');
//     grad.addColorStop(0.51, 'rgb(240, 0, 0)');
//     grad.addColorStop(1, 'rgb(5, 0, 0)');
//     ctx.lineWidth = 1;
//     ctx.strokeStyle = grad;
//     ctx.strokeText(text, posx, posy - 3);
//   }

//   // red
//   {
//     var grad = ctx.createLinearGradient(0, 20, 0, 100);
//     grad.addColorStop(0, 'rgb(230, 0, 0)');
//     grad.addColorStop(0.5, 'rgb(123, 0, 0)');
//     grad.addColorStop(0.51, 'rgb(240, 0, 0)');
//     grad.addColorStop(1, 'rgb(5, 0, 0)');
//     ctx.fillStyle = grad;
//     ctx.fillText(text, posx, posy - 3);
//   }
// }


// export function draw_5000yen_white(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, text: string, x: number, y: number) {
//   //黒色
//   {
//     ctx.strokeStyle = "#000";
//     ctx.lineWidth = 22;
//     ctx.strokeText(text, x + 5, y + 2);
//   }

//   // 銀
//   {
//     const grad = ctx.createLinearGradient(0, y - 80, 0, y + 18);
//     grad.addColorStop(0, 'rgb(0,15,36)');
//     grad.addColorStop(0.25, 'rgb(250,250,250)');
//     grad.addColorStop(0.5, 'rgb(150,150,150)');
//     grad.addColorStop(0.75, 'rgb(55,58,59)');
//     grad.addColorStop(0.85, 'rgb(25,20,31)');
//     grad.addColorStop(0.91, 'rgb(240,240,240)');
//     grad.addColorStop(0.95, 'rgb(166,175,194)');
//     grad.addColorStop(1, 'rgb(50,50,50)');
//     ctx.strokeStyle = grad;
//     ctx.lineWidth = 19;
//     ctx.strokeText(text, x + 5, y + 2);
//   }

//   //黒色
//   {
//     ctx.strokeStyle = "#10193A";
//     ctx.lineWidth = 17;
//     ctx.strokeText(text, x, y);
//   }

//   // 白
//   {
//     ctx.strokeStyle = "#DDD";
//     ctx.lineWidth = 8;
//     ctx.strokeText(text, x, y);
//   }

//   //紺
//   {
//     const grad = ctx.createLinearGradient(0, y - 80, 0, y);
//     grad.addColorStop(0, 'rgb(16,25,58)');
//     grad.addColorStop(0.03, 'rgb(255,255,255)');
//     grad.addColorStop(0.08, 'rgb(16,25,58)');
//     grad.addColorStop(0.2, 'rgb(16,25,58)');
//     grad.addColorStop(1, 'rgb(16,25,58)');
//     ctx.strokeStyle = grad;
//     ctx.lineWidth = 7;
//     ctx.strokeText(text, x, y);
//   }

//   //銀
//   {
//     const grad = ctx.createLinearGradient(0, y - 80, 0, y);
//     grad.addColorStop(0, 'rgb(245,246,248)');
//     grad.addColorStop(0.15, 'rgb(255,255,255)');
//     grad.addColorStop(0.35, 'rgb(195,213,220)');
//     grad.addColorStop(0.5, 'rgb(160,190,201)');
//     grad.addColorStop(0.51, 'rgb(160,190,201)');
//     grad.addColorStop(0.52, 'rgb(196,215,222)');
//     grad.addColorStop(1.0, 'rgb(255,255,255)');
//     ctx.fillStyle = grad;
//     ctx.fillText(text, x, y - 3);
//   }

//   w = ctx.measureText(text).width + 30;
// }