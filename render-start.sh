#!/bin/bash

CHROME_URL="https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb"
INSTALL_DIR="/opt/google/chrome"

# Ensure the installation directory exists
mkdir -p $INSTALL_DIR

# Download Google Chrome
echo "Downloading Google Chrome..."
wget -q --show-progress -O /tmp/google-chrome.deb $CHROME_URL

# Install Google Chrome (assuming dpkg doesn't require sudo)
echo "Installing Google Chrome..."
dpkg -i /tmp/google-chrome.deb

# Verify installation and set Chrome to PATH
if [ -x "$(command -v google-chrome)" ]; then
    echo "Google Chrome installed successfully!"
    echo "Adding Chrome to PATH..."
    echo "export PATH=\$PATH:$INSTALL_DIR" >> $HOME/.bashrc
    source $HOME/.bashrc
    echo "Chrome added to PATH."
else
    echo "Failed to install Google Chrome."
fi

# Clean up downloaded package
rm /tmp/google-chrome.deb

echo "Installation completed."
