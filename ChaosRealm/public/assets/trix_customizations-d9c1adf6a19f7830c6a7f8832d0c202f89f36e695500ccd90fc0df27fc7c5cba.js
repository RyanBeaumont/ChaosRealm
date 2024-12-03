document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("trix-initialize", (event) => {
    console.log("Editor initialized");
    const toolbar = event.target.toolbarElement;
    const editor = event.target.editor; // Get the editor instance from the event

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

    const colorPickerButton = toolbar.querySelector('[data-trix-action="text-color"]');
    const colorPickerInput = toolbar.querySelector(".trix-color-picker");

    // Handle the button click to open the color picker
    colorPickerButton.addEventListener("click", () => {
      colorPickerInput.click();
    });

    // Handle color picker input
    colorPickerInput.addEventListener("input", (event) => {
      const color = event.target.value;

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

      // Wrap the selected text with a span tag and apply color
      const coloredText = `<span style="color: ${color};">${editor.getDocument().getText()}</span>`;

      // Insert the styled text into the editor
      editor.insertHTML(coloredText);
    });
  });
});
