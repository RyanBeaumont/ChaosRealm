document.addEventListener("trix-initialize", function (event) {
  const toolbar = event.target.toolbarElement;

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
    const editor = event.target.closest("trix-editor");

    // Apply the color using a custom span with a style
    if (editor && editor.editor) {
      const selectedRange = editor.editor.getSelectedRange();
      if (selectedRange[0] === selectedRange[1]) {
        // No text is selected; ignore
        alert("Please select text to apply a color.");
        return;
      }

      // Wrap selected text in a span with the selected color
      editor.editor.setSelectedRange(selectedRange);
      editor.editor.recordUndoEntry("Change Text Color");
      editor.editor.insertHTML(`<span style="color: ${color};">${editor.editor.getSelectedDocument().toString()}</span>`);
    }
  });
});
