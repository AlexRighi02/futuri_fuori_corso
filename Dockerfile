# ===== STAGE 1: Build del front-end =====
FROM node:20-slim AS frontend-builder

WORKDIR /app/front-end

# Copia i file del front-end
COPY front-end/package*.json ./
RUN npm install

COPY front-end/ ./
RUN npm run build

# ===== STAGE 2: Back-end con Python e Playwright =====
FROM python:3.11-slim

# Install librerie di sistema necessarie per Playwright
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    wget \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libpango-1.0-0 \
    libgtk-3-0 \
    fonts-liberation \
    libwoff1 \
    xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Variabili d'ambiente per Playwright (chromium headless)
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Working directory per il back-end
WORKDIR /app/back-end

# Copia i requirements e installa le dipendenze
COPY back-end/requirements.txt /app/back-end/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Installa Playwright e i browser
RUN pip install playwright && playwright install --with-deps

# Copia il codice del back-end
COPY back-end/ /app/back-end/

# Copia il build del front-end dal primo stage
COPY --from=frontend-builder /app/front-end/build /app/front-end/build

# Espone la porta
EXPOSE 8080

# Avvio server Flask con Gunicorn
CMD ["gunicorn", "server:app", "--bind", "0.0.0.0:8080"]
