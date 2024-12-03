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

    const colorPickerButton = toolbar.querySelector('[data-trix-action="text-color"]');
    const colorPickerInput = toolbar.querySelector(".trix-color-picker");

    // Handle the button click to open the color picker
    colorPickerButton.addEventListener("click", () => {
      colorPickerInput.click();
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

      // Apply the color to the selected text
      editor.activateAttribute("color");
      console.log("Updated text color = " + color);
    });
  });
});
