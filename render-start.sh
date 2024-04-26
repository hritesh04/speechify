#!/bin/bash

CHROME_URL="https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb"

INSTALL_DIR="/opt/google/chrome"

echo "Downloading Google Chrome..."
wget -q --show-progress -O /tmp/google-chrome.deb $CHROME_URL

echo "Installing Google Chrome..."
sudo dpkg -i /tmp/google-chrome.deb

if [ -x "$(command -v google-chrome)" ]; then
    echo "Google Chrome installed successfully!"
    echo "Adding Chrome to PATH..."
    echo "export PATH=\$PATH:$INSTALL_DIR" >> ~/.bashrc
    source ~/.bashrc
    echo "Chrome added to PATH."
else
    echo "Failed to install Google Chrome."
fi

rm /tmp/google-chrome.deb

echo "Installation completed."
