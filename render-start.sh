#!/bin/bash

CHROME_URL="https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb"

CHROME_DEB="google-chrome-stable_current_amd64.deb"

# Create a temporary directory
TMP_DIR=$(mktemp -d)

# Download Google Chrome
echo "Downloading Google Chrome..."
curl -o "${TMP_DIR}/${CHROME_DEB}" "${CHROME_URL}"

# Extract the .deb package
echo "Extracting Google Chrome package..."
DEB_DIR="${TMP_DIR}/chrome"
mkdir -p "${DEB_DIR}"
dpkg-deb -x "${TMP_DIR}/${CHROME_DEB}" "${DEB_DIR}"

# Move the extracted files to the desired location
INSTALL_DIR="/home/render/chrome"
mkdir -p "${INSTALL_DIR}"
mv "${DEB_DIR}/opt/google/chrome" "${INSTALL_DIR}"

# Add Google Chrome to PATH
echo "Adding Google Chrome to PATH..."
CHROME_BIN="${INSTALL_DIR}/chrome/chrome"
echo "export PATH=\$PATH:${INSTALL_DIR}/chrome" >> ~/.bashrc
source ~/.bashrc

# Clean up
rm -rf "${TMP_DIR}"

echo "Google Chrome has been installed and added to PATH."