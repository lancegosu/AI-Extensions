document.addEventListener('DOMContentLoaded', function () {
  // Send a message to the background script to get the transformation
  chrome.runtime.sendMessage({ action: "getDefinition" }, function (response) {
    const definitionDiv = document.getElementById('definition'); // Get the "definition" div element
    if (response && response.definition) {
      definitionDiv.innerText = response.definition; // Update the content of the "definition" div with the received definition
    } else {
      definitionDiv.innerText = "No transformation available."; // Handle the case where no transformation is received
    }
  });
});
