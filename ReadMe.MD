![Logo](https://i.imgur.com/Z7pklez.png)

## Overview

Duelists - Are you tired of clicking through all your actions on [DuelingBook](https://www.duelingbook.com/html5)?

Dueling Book Enhanced is a collection of features designed to enhance your experience on DuelingBook. It includes a TypeScript content script and a React popup, providing various improvements and customization options.

## Features

1. **Hotkeys**: Use hotkeys for immediate actions.

  

   - **Close View Menu**: Closes the view menu.
   - **View Graveyard**: Toggles the display of your graveyard.
   - **View Main Deck**: Toggles the display of your main deck.
   - **View Extra Deck**: Toggles the display of your extra deck.
   - **Think**: Press the thinking button and send a chat message indicating that you're thinking.
   - **Thumbs Up**: Press the thumbs-up button.
   - **Toggle Chat Box**: Start or finish typing in the chat box with a single keypress.

    **Note: The hotkeys below require you to hover over a card. **
   
   - **To Graveyard**: Sends a card to the graveyard.
   - **To Hand**: Sends a card to your hand.
   - **Activate**: Activates a card.
   - **S. Summon ATK**: Special Summons a card in attack position.
   - **Normal Summon**: Special Summons a card in attack position.
   - **Set**: Sets a card.
   - **Declare**: Declares a card.
   - **Banish**: Banishes a card.

2. **Dark Mode**: Apply a dark mode stylesheet.
3. **Skip Intro**: Automatically skip the intro movie.
4. **AutoConnect**: Automatically connect on page load.

## Usage

### Content Script

To use the content script:

1. **Installation**: Install a browser extension that supports content scripts (e.g., Tampermonkey or Greasemonkey).

2. **Script Injection**: Add the TypeScript script as a content script in your extension's settings.

3. **Configuration**: Customize hotkeys and options by modifying the `actionFunctionMap` and `hotkeyHashMap` objects in the script.

4. **Execution**: Visit DuelingBook, and the script will enhance functionality based on your settings.

### Popup

To use the popup:

1. **Extension Icon**: Click the extension icon in your browser to open the popup.

2. **Settings**: Customize your experience by enabling/disabling options in the General Settings section.

3. **Customize Hotkeys**: Configure hotkeys for actions in the Customize Hotkeys section.

4. **Advanced Settings**: Access advanced options if needed.

5. **Help**: Find info on issues and upcoming features in the Help section.

## Compatibility

The content script is designed for DuelingBook using Google Chrome. Future versions will allow compatibility with both Safari and Firefox.

## License

Dueling Book Enhanced is under the [MIT License](LICENSE.md).

## Disclaimer

Use Dueling Book Enhanced responsibly and respect the rights of Yu-Gi-Oh! owned by its respective copyright holders, as well as [DuelingBook](https://www.duelingbook.com/html5)'s terms of use. The author is not responsible for the misuse or unauthorized use of these scripts.

## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Demo

Insert gif or link to demo

https://imgur.com/PnzoW3N
