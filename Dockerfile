FROM python:3.11-slim

# Install Chromium e Chromedriver
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# Variabili d'ambiente per Selenium
ENV CHROME_BIN=/usr/bin/chromium
ENV CHROMEDRIVER_PATH=/usr/bin/chromedriver

# Copia i file di progetto
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Espone la porta di Flask/Gunicorn
EXPOSE 8080

# Avvia il server
CMD ["gunicorn", "server:app", "--bind", "0.0.0.0:8080"]
