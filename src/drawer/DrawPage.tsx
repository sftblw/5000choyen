import { Component, onMount, createSignal, createEffect } from 'solid-js';
import "./DrawPage.scss";
// import { draw_5000yen } from './Drawer';

import Drawer from './lib/drawer';

import { TextField } from "@kobalte/core";
import FontSelect from './FontSelect';

const DrawPage: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  let drawer: Drawer | null = null;

  // Create a local state for the input value
  const [textRed, setTextRed] = createSignal("5000兆円");
  const [textWhite, setTextWhite] = createSignal("欲しい！");
  const [selectedFont, setSelectedFont] = createSignal("Noto Sans JP");

  // Enhanced drawing function with TypeScript annotation for context
  const drawSomething = () => {
    if (canvasRef == null) { return; }
    drawer = new Drawer(canvasRef);

    drawer.draw(textRed(), textWhite(), `100px ${selectedFont()}`);
  };

  // Use onMount to ensure we manipulate the canvas after it's been mounted
  onMount(() => {
    drawSomething(); // Initial draw
  });

  // Reactively draw on text change
  createEffect(() => {
    drawSomething();
  });

  return (
    <div>
      <canvas ref={canvasRef} width={1500} height={290} class='b-sky b-1 m-4'></canvas>

      <TextField.Root class="text-field" value={textRed()} onChange={setTextRed}>
        <TextField.Label class="text-field__label">5000兆円</TextField.Label>
        <TextField.Input class="text-field__input" />
      </TextField.Root>
      <TextField.Root class="text-field" value={textWhite()} onChange={setTextWhite}>
        <TextField.Label class="text-field__label">欲しい！</TextField.Label>
        <TextField.Input class="text-field__input" />
      </TextField.Root>

      <input type="text" value={selectedFont()} onChange={(ev) => setSelectedFont(ev.target.textContent)}/>
      <FontSelect selectedFont={selectedFont} setSelectedFont={(font) => setSelectedFont(font)}/>
    </div>
  );
};

export default DrawPage;
