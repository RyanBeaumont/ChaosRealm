document.addEventListener("trix-initialize", function(event) {
    console.log("Trix editor initialized");
  
    var editor = event.target;
  
    // Add custom button to the toolbar
    editor.toolbarElement.querySelector("[data-trix-button-group=text-tools]").insertAdjacentHTML(
      "beforeend",
      '<button type="button" class="trix-button trix-button--icon-forecolor" title="Text color" data-trix-attribute="forecolor" data-trix-value="red">Text Color</button>'
    );
  });
