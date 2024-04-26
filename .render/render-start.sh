#!/bin/bash

CHROME_URL="https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb"
INSTALL_DIR=".render/google"

mkdir -p "$INSTALL_DIR/chrome"

# Download Google Chrome
if [[ -d "$INSTALL_DIR/chrome" ]]; then
    echo "Downloading Google Chrome..."

    #cd "$INSTALL_DIR/chrome"
    wget -P ./ "$CHROME_URL"

    echo "Installing Google Chrome..."
    dpkg -x ./google-chrome-stable_current_amd64.deb

    rm ./google-chrome-stable_current_amd64.deb
    #cd "$HOME"
    echo "Google Chrome installed successfully!"
    echo "Adding Chrome to PATH..."
    echo "export PATH=\$PATH:/" >> "$HOME/.bashrc"
    source "$HOME/.bashrc"
    echo "Chrome added to PATH."
else
    echo "Using Chrome from cache"
fi

echo "Installation completed."
