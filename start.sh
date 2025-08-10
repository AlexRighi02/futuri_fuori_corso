#!/bin/bash
apt-get update && \
    apt-get install -y wget unzip curl \
    chromium-browser chromium-browser-l10n \
    chromium-codecs-ffmpeg

# Scarica l'ultima versione compatibile di ChromeDriver
CHROME_VERSION=$(chromium-browser --version | awk '{print $2}')
CHROMEDRIVER_VERSION=$(curl -s "https://googlechromelabs.github.io/chrome-for-testing/LATEST_RELEASE_STABLE")
wget -O /tmp/chromedriver.zip "https://storage.googleapis.com/chrome-for-testing-public/${CHROMEDRIVER_VERSION}/linux64/chromedriver-linux64.zip"
unzip /tmp/chromedriver.zip -d /usr/local/bin/
chmod +x /usr/local/bin/chromedriver

# Avvia il server Python
python server.py
