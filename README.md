# AI Extensions

AI Extensions currently consists of two independent Chrome extensions: LookItUp and Persona, each leveraging OpenAI GPT-3.5-turbo for text-related tasks.

## LookItUp

### Overview

LookItUp allows users to define highlighted text on a webpage.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/lancegosu/AI-Extensions.git
    cd AI-Extensions
    ```
    - Note: You will only need to clone this repository once to receive both extensions.

2. Load the extensions in Chrome:
    - Open Chrome and go to `chrome://extensions/`.
    - Enable "Developer mode."
    - Click "Load unpacked" and select the extension directory.

3. Set up API key:
    - Open the options page by clicking "Details" on the extensions page and then clicking "Extension options."
    - Enter your OpenAI API key and click "Save."

### Usage

1. Highlight text on a webpage.
2. Right-click and select "Define Text" from the context menu.
3. The extension generates a definition using GPT-3.5-turbo and displays it.

## Persona

### Overview

Persona transforms highlighted text into different styles of language.

### Installation

Follow the installation steps for LookItUp, as the process is the same for both extensions.

### Usage

1. Highlight text on a webpage.
2. Right-click and select a language style from the "Transform" submenu.
3. The extension transforms the text and displays it.

## Note

Make sure to comply with OpenAI's use-case policies and guidelines when using these extensions.

