// Define a variable to store the definition
let storedDefinition = null;
let apiKey = null;

// Helper function to retrieve the API key from Chrome storage
function getApiKey(callback) {
  chrome.storage.sync.get(['apiKey'], function(result) {
    apiKey = result.apiKey || null;
    callback(apiKey);
  });
}

// Create the context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "defineText",
    title: "Define Text",
    contexts: ["selection"],
  });
});

// Function to open the pop-up
function openPopup() {
  const popupUrl = chrome.runtime.getURL("popup.html"); // Define the URL for your pop-up HTML page
  chrome.tabs.create({ url: popupUrl }); // Open a new tab with the pop-up URL
}

// Event listener for context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "defineText") {
    const selectedText = info.selectionText;

    // Check if API key is available
    getApiKey(apiKey => {
      if (!apiKey) {
        console.error('API key is missing. Please set your API key in the extension options page.');
        return;
      }

      // Generate text using GPT-3.5-turbo
      generateTextWithGPT35Turbo(selectedText, (assistantResponse) => {
        storedDefinition = assistantResponse;
        openPopup();
      }, apiKey);
    });
  }
});

// Message listener to handle messages from the pop-up script and options page
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getDefinition") {
    sendResponse({ definition: storedDefinition }); // Send the stored definition to the pop-up script
  } else if (message.action === "getApiKey") {
    // Retrieve the API key from Chrome storage
    chrome.storage.sync.get(['apiKey'], function(result) {
      apiKey = result.apiKey || null;
      sendResponse({ apiKey: apiKey });
    });
    // Indicate that the response will be sent asynchronously
    return true;
  } else if (message.action === "updateApiKey") {
    console.log('API key updated.'); // Handle the case where the API key is updated, e.g., after saving in the options page
    sendResponse({ success: true }); // Acknowledge the message to avoid the "Could not establish connection" error
  }
});

// Function to generate text using GPT-3.5-turbo
async function generateTextWithGPT35Turbo(selectedText, callback, apiKey) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: `Define "${selectedText}" and provide its synonyms and antonyms` }
  ];

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-1106",
        messages: messages,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const assistantResponse = data.choices[0].message.content;
      callback(assistantResponse);
    } else {
      console.error('API request failed:', response.statusText);
    }
    
  } catch (error) {
    console.error('API request error:', error);
  }
}
