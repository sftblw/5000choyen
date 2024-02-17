import { defineConfig } from '@unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      prefix: "i-",
      scale: 4
    })
  ],
  transformers: [
    transformerDirectives(),
  ],
});
