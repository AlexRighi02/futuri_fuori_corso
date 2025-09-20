# ===== STAGE 1: Build del front-end =====
FROM node:20-slim AS frontend-builder

WORKDIR /app/front-end

# Copia solo package.json per la cache dei layer
COPY front-end/package*.json ./
RUN npm ci --omit=dev

# Copia i sorgenti e build
COPY front-end/ ./
RUN npm run build


# ===== STAGE 2: Back-end Python + Playwright =====
FROM python:3.11-slim

WORKDIR /app/back-end

# Dipendenze di sistema per Playwright + librerie base
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    wget \
    ca-certificates \
    fonts-liberation \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libasound2 \
    libgtk-3-0 \
    libdrm2 \
    libcups2 \
    libxcb1 \
    libxss1 \
    libxshmfence1 \
    && rm -rf /var/lib/apt/lists/*

# Variabili ambiente
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8080

# Copia requirements e installa
COPY back-end/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Installa Playwright e i browser Chromium
RUN pip install playwright && playwright install chromium

# Copia il codice back-end
COPY back-end/ .

# Copia build front-end
COPY --from=frontend-builder /app/front-end/build /app/front-end/build

# Espone la porta per Fly.io
EXPOSE $PORT

# Avvio Gunicorn
CMD ["gunicorn", "server:app", "--bind", "0.0.0.0:8080"]
