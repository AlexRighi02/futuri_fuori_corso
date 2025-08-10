#!/bin/bash
# Installa Chromium e Chromedriver
apt-get update && apt-get install -y chromium-browser chromium-driver

# Avvia il server Flask
python server.py
