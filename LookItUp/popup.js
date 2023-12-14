document.addEventListener('DOMContentLoaded', function () {
  // Send a message to the background script to get the definition
  chrome.runtime.sendMessage({ action: "getDefinition" }, function (response) {
    const definitionDiv = document.getElementById('definition'); // Get the "definition" div element
    if (response && response.definition) {
      definitionDiv.innerText = response.definition; // Update the content of the "definition" div with the received definition
    } else {
      definitionDiv.innerText = "No definition available."; // Handle the case where no definition is received
    }
  });
});
