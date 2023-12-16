// Define a variable to store the transformation
let storedDefinition = null;
let apiKey = null;

// Helper function to retrieve the API key from Chrome storage
function getApiKey(callback) {
  chrome.storage.sync.get(['apiKey'], function(result) {
    apiKey = result.apiKey || null;
    callback(apiKey);
  });
}

// Create the main context menu item
chrome.runtime.onInstalled.addListener(() => {
  const mainMenuItemId = "transformText";
  chrome.contextMenus.create({
    id: mainMenuItemId,
    title: "Transform",
    contexts: ["selection"],
  });

  // Create submenus for different styles
  const styles = ["Business Professional", "Professional", "Formal", "Informal", "Casual", "Poetic", "Humorous", "Satirical"];
  styles.forEach((style) => {
    chrome.contextMenus.create({
      id: `${mainMenuItemId}-${style.toLowerCase()}`,
      parentId: mainMenuItemId,
      title: style,
      contexts: ["selection"],
    });
  });
});

// Function to open the pop-up
function openPopup() {
  const popupUrl = chrome.runtime.getURL("popup.html"); // Define the URL for your pop-up HTML page
  chrome.tabs.create({ url: popupUrl }); // Open a new tab with the pop-up URL
}

// Listener for context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const selectedText = info.selectionText;
  const style = info.menuItemId.split("-")[1];

  if (style) {
    console.log(`Transforming text with style: ${style}`);
    // Modify the messages array to include the selected style
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: `Transform the following text into ${style.toLowerCase()} language: "${selectedText}"` }
    ];

    // Get the API key before making the API request
    getApiKey(apiKey => {
      if (!apiKey) {
        console.error('API key is missing. Please set your API key in the extension options page.');
        return;
      }

      // Call the function to generate text using GPT-3.5-turbo
      generateTextWithGPT35Turbo(selectedText, messages, (assistantResponse) => {
        storedDefinition = assistantResponse;
        openPopup();
      }, apiKey);
    });
  }
});

// Message listener to handle messages from the pop-up script and options page
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getDefinition") {
    sendResponse({ definition: storedDefinition }); // Send the stored transformation to the pop-up script
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
async function generateTextWithGPT35Turbo(selectedText, messages, callback, apiKey) {
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

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
