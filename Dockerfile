# ===== STAGE 1: Build del front-end =====
FROM node:20-slim AS frontend-builder

WORKDIR /app/front-end

# Copia i file del front-end
COPY front-end/package*.json ./
RUN npm install

COPY front-end/ ./
RUN npm run build


# ===== STAGE 2: Back-end con Python e Flask =====
FROM python:3.11-slim

# Install Chromium e Chromedriver
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# Variabili d'ambiente per Selenium
ENV CHROME_BIN=/usr/bin/chromium
ENV CHROMEDRIVER_PATH=/usr/bin/chromedriver

# Working directory per il back-end
WORKDIR /app/back-end

# Copia i requirements e installa le dipendenze
COPY back-end/requirements.txt /app/back-end/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copia il codice del back-end
COPY back-end/ /app/back-end/

# Copia il build del front-end dal primo stage
COPY --from=frontend-builder /app/front-end/build /app/front-end/build

# Espone la porta
EXPOSE 8080

# Avvio server Flask con Gunicorn
CMD ["gunicorn", "server:app", "--bind", "0.0.0.0:8080"]
