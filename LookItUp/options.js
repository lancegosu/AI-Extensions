document.addEventListener('DOMContentLoaded', function() {
  // Get the elements by their IDs
  const apiKeyInput = document.getElementById('apiKey');
  const saveButton = document.getElementById('saveButton');

  // Load the saved API key from Chrome storage and populate the input field
  chrome.storage.sync.get(['apiKey'], function(result) {
    apiKeyInput.value = result.apiKey || '';
  });

  // Save the API key when the user clicks "Save"
  saveButton.addEventListener('click', function() {
    const apiKey = apiKeyInput.value; // Get the API key from the input field

    // Save the API key to Chrome storage
    chrome.storage.sync.set({ 'apiKey': apiKey }, function() {
      console.log('API Key saved');
      alert('API key saved successfully!');

      // After saving the API key, send a message to the background script to acknowledge the update
      chrome.runtime.sendMessage({ action: "updateApiKey" }, function(response) {
        if (response.success) {
          console.log('API key update acknowledged.');
        } else {
          console.error('Failed to acknowledge API key update.');
        }
      });
    });
  });
});
