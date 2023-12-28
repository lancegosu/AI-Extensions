# aiXtensions

aiXtensions currently contains two Chrome extensions: LookItUp and Persona, each leveraging OpenAI's GPT-3.5-turbo for text-related tasks.

## LookItUp

### Overview

LookItUp allows users to define highlighted text on a webpage using OpenAI's GPT-3.5-turbo.

### Usage

1. Highlight text on a webpage.
2. Right-click and select "Define Text" from the context menu.
3. The extension generates a definition using GPT-3.5-turbo and displays it.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/lancerai/aiXtensions.git
    cd aiXtensions
    ```
    - Note: You will only need to clone this repository once to receive both extensions.

2. Load the extensions in Chrome:
    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode."
    - Click "Load unpacked" and select the extension directory.

3. Set up API key:
    - Open the options page by clicking "Details" on the extensions page and then clicking "Extension options."
    - Enter your OpenAI API key and click "Save."

## Persona

### Overview

Persona transforms highlighted text into different styles of language using OpenAI's GPT-3.5-turbo.

### Usage

1. Highlight text on a webpage.
2. Right-click and select a language style from the "Transform" submenu.
3. The extension transforms the text and displays it.

### Installation

Follow the installation steps for LookItUp, as the process is the same for both extensions.

## Note

Make sure to comply with OpenAI's use-case policies and guidelines when using these extensions.

