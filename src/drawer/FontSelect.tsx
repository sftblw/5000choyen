import { Component, onMount, createSignal, createEffect, mergeProps, For, Accessor } from 'solid-js';
import "./FontSelect.scss";
import "./kobalte_select.scss";

import { Select } from "@kobalte/core";

interface FontSelectProps {
  selectedFont: Accessor<string>;
  setSelectedFont: (font: string) => void;
}

const FontSelect: Component = (props: FontSelectProps) => {
  const [fonts, setFonts] = createSignal([]);
  const [fontsMessage, setFontsMessage] = createSignal("SystemFont (not loaded)");

  let selectTriggerRef: HTMLButtonElement | undefined = undefined;
  let selectRootRef: any | undefined = undefined;

  const unique = (array) => [...new Set(array)];
  
  if (!("queryLocalFonts" in window)) {
    setFontsMessage("SystemFont (unsupported)");
  }

  // Async function to query local fonts
  async function queryFonts() {
    if ("queryLocalFonts" in window) {
      try {
        setFontsMessage("SystemFont (loading...)");
        // @ts-ignore
        const localFonts = await window.queryLocalFonts({persistentAccess: true});
        const fontFaces = unique(localFonts.map(font => font.family));
        setFonts(fontFaces);
        setFontsMessage("Select Font...");
        
        // 여기서 토글해야 함
        console.log(selectRootRef )
        selectRootRef.open = true;
      } catch (error) {
        console.error("Error querying local fonts:", error);
      }
    }
  }

  async function checkFontLoad() {
    if (fonts().length == 0) {
        await queryFonts();
    }
  }

  return (
    <div> 
      <Select.Root
        options={fonts()}
        onClick={() => checkFontLoad()}
        placeholder={fontsMessage()}
        value={props.selectedFont()}
        onChange={props.setSelectedFont}
        ref={selectRootRef}
        itemComponent={props => (
          <Select.Item item={props.item} class="select__item">
            <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
            <Select.ItemIndicator class="select__item-indicator">
            </Select.ItemIndicator>
          </Select.Item>
        )}
      >
      <Select.Trigger class="select__trigger" aria-label="click" ref={selectTriggerRef}>
      <Select.Value<string>>{state => state.selectedOption()}</Select.Value>
        <Select.Icon class="select__icon">
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class="select__content">
          <Select.Listbox class="select__listbox" />
        </Select.Content>
      </Select.Portal>
        
      </Select.Root>
    </div>
  );
};

export default FontSelect;
