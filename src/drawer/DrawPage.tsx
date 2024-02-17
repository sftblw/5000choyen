import "./DrawPage.scss";
import "../kobalte_css/kobalte_checkbox.scss";
import { Component, onMount, createSignal, createEffect } from 'solid-js';

import Drawer from './lib/drawer';

import { Button, TextField } from "@kobalte/core";
import FontSelect from './FontSelect';
import { Checkbox } from "@kobalte/core";


const DrawPage: Component = () => {
  let canvasRef: HTMLCanvasElement | undefined;
  let drawer: Drawer | null = null;

  // Create a local state for the input value
  const [textRed, setTextRed] = createSignal("5000兆円");
  const [textWhite, setTextWhite] = createSignal("欲しい！");
  const [selectedFont, setSelectedFont] = createSignal("Noto Sans JP");
  const [useTransparent, setUseTransparent] = createSignal(false);

  // Enhanced drawing function with TypeScript annotation for context
  const drawSomething = () => {
    if (canvasRef == null) { return; }
    if (drawer == null) {
      drawer = new Drawer(canvasRef);
    }

    drawer.useTransparent = useTransparent();
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
      <canvas ref={canvasRef} width={1500} height={270} class="canvas-hoshii"></canvas>
      
      <div class="buttons">
        <Button.Root class="icon-button" onClick={() => drawer?.saveImage()}>
          <div class="i-tabler:arrow-bar-to-down">download</div>
        </Button.Root>
        <Button.Root class="icon-button" onClick={() => drawer?.openImage()}>
          <div class="i-tabler:photo-share">open in new tab</div>
        </Button.Root>
        <Button.Root class="icon-button" onClick={() => drawer?.openImageDataURL()}>
          <div class="i-tabler:photo-share">open in new tab</div>
          <span>(data URL)</span>
        </Button.Root>

        <Checkbox.Root class="checkbox"  checked={useTransparent()} onChange={setUseTransparent}>
        <Checkbox.Input class="checkbox__input" />
        <Checkbox.Control class="checkbox__control">
          <Checkbox.Indicator>
          </Checkbox.Indicator>
        </Checkbox.Control>
        <Checkbox.Label class="checkbox__label">transparent background</Checkbox.Label>
      </Checkbox.Root>
      </div>

      <TextField.Root class="text-field" value={textRed()} onChange={setTextRed}>
        <TextField.Label class="text-field__label">5000兆円</TextField.Label>
        <TextField.Input class="text-field__input" />
      </TextField.Root>
      <TextField.Root class="text-field" value={textWhite()} onChange={setTextWhite}>
        <TextField.Label class="text-field__label">欲しい！</TextField.Label>
        <TextField.Input class="text-field__input" />
      </TextField.Root>

      <TextField.Root class="text-field" value={selectedFont()} onChange={setSelectedFont}>
        <TextField.Label class="text-field__label">Font (manual input)</TextField.Label>
        <TextField.Input class="text-field__input" />
      </TextField.Root>

      <FontSelect selectedFont={selectedFont} setSelectedFont={(font) => setSelectedFont(font)}/>
    </div>
  );
};

export default DrawPage;
