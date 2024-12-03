document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("trix-initialize", (event) => {
    console.log("Editor initialized");
    const toolbar = event.target.toolbarElement;
    const editor = event.target.editor; // Get the editor instance from the event
     
    // Add the font dropdown to the toolbar
    const fontDropdownHTML = `
      <select class="trix-font-selector">
        <option value="">Font</option>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier New</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Verdana">Verdana</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Roboto">Roboto</option>
        <option value="Open Sans">Open Sans</option>
        <option value="Lato">Lato</option>
        <option value="Tahoma">Tahoma</option>
        <option value="Comic Sans MS">Comic Sans MS</option>
        <option value="Impact">Impact</option>
        <option value="Trebuchet MS">Trebuchet MS</option>
        <option value="Arial Black">Arial Black</option>
        <option value="Courier">Courier</option>
      </select>
    `;
    
    // Add a text size dropdown to the toolbar (extended to 100pt)
    const textSizeDropdownHTML = `
      <select class="trix-text-size-selector">
        <option value="16px">16pt</option>
        <option value="18px">18pt</option>
        <option value="20px">20pt</option>
        <option value="24px">24pt</option>
        <option value="28px">28pt</option>
        <option value="32px">32pt</option>
        <option value="36px">36pt</option>
        <option value="40px">40pt</option>
        <option value="44px">44pt</option>
        <option value="48px">48pt</option>
        <option value="52px">52pt</option>
        <option value="56px">56pt</option>
        <option value="60px">60pt</option>
        <option value="64px">64pt</option>
        <option value="68px">68pt</option>
        <option value="72px">72pt</option>
        <option value="76px">76pt</option>
        <option value="80px">80pt</option>
        <option value="84px">84pt</option>
        <option value="88px">88pt</option>
        <option value="92px">92pt</option>
        <option value="96px">96pt</option>
        <option value="100px">100pt</option>
      </select>
    `;



    // Add a color picker button
    const colorPickerButtonHTML = `
      <button type="button" class="trix-button" title="Text Color" data-trix-action="text-color">
        🎨
      </button>
      <input type="color" class="trix-color-picker" style="display: none;" />
    `;

    // Append the button and hidden color picker to the toolbar
    const groupElement = toolbar.querySelector(".trix-button-group--text-tools");
    groupElement.insertAdjacentHTML("beforeend", colorPickerButtonHTML);
    const groupElement2 = toolbar.querySelector(".trix-button-group--text-tools");
    groupElement2.insertAdjacentHTML("beforeend", fontDropdownHTML);
    const groupElement3 = toolbar.querySelector(".trix-button-group--text-tools");
    groupElement3.insertAdjacentHTML("beforeend", textSizeDropdownHTML);

    const colorPickerButton = toolbar.querySelector('[data-trix-action="text-color"]');
    const colorPickerInput = toolbar.querySelector(".trix-color-picker");
    const fontInput = toolbar.querySelector(".trix-font-selector")
    const textSizeSelector = toolbar.querySelector(".trix-text-size-selector");

    // Handle the button click to open the color picker
    colorPickerButton.addEventListener("click", () => {
      colorPickerInput.click();
    });

    // Handle text size selection
    textSizeSelector.addEventListener("change", (event) => {
      const textSize = event.target.value;
      // Check if editor is available
      if (!editor) {
        alert("Editor not found. Please ensure the editor is properly initialized.");
        return;
      }

      if (textSize) {
        editor.activateAttribute("fontSize", textSize); // Activate the font size attribute
        console.log("Text size change: " + textSize);
      }
    });

    //Handle fontSelection
    const fontSelector = toolbar.querySelector(".trix-font-selector");
    fontSelector.addEventListener("change", (event) => {
      const fontFamily = event.target.value;
      // Check if editor is available
      if (!editor) {
        alert("Editor not found. Please ensure the editor is properly initialized.");
        return;
      }

      if (fontFamily) {
        editor.activateAttribute("fontFamily", fontFamily);
        console.log("Font Change");
        
      } else {
        editor.deactivateAttribute("fontFamily");
      }
    });

    // Handle color picker input
    colorPickerInput.addEventListener("input", (event) => {
      const color = event.target.value;
      //const color = 'red';

      // Check if editor is available
      if (!editor) {
        alert("Editor not found. Please ensure the editor is properly initialized.");
        return;
      }

      // Get the selected range in the document
      const selectedRange = editor.getSelectedRange();
      if (!selectedRange || selectedRange[0] === selectedRange[1]) {
        alert("Please select text to apply a color.");
        return;
      }

      // Apply the color to the selected text
      editor.recordUndoEntry("Change Text Color");

      // Create a custom color attribute for text
      Trix.config.textAttributes.color = {
        tagName: "span",
        style: { color: color },
        inheritable: true
      };

      Trix.config.textAttributes.fontFamily = {
        styleProperty: "font-family",
        inheritable: true,
        parser: (element) => element.style.fontFamily,
      };

      Trix.config.textAttributes.fontSize = {
        tagName: "span",
        styleProperty: "font-size",
        inheritable: true,
        parser: (element) => element.style.fontSize,
      };

      // Apply the color to the selected text
      editor.activateAttribute("color");
      console.log("Updated text color = " + color);
    });
  });
});
