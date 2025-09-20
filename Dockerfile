# ===== STAGE 1: Build del front-end =====
FROM node:20-slim AS frontend-builder

WORKDIR /app/front-end

# Copia solo package.json e package-lock.json per la cache dei layer
COPY front-end/package*.json ./
RUN npm ci --omit=dev

# Copia i sorgenti del front-end e build
COPY front-end/ ./
RUN npm run build


# ===== STAGE 2: Back-end con Python e Playwright =====
FROM mcr.microsoft.com/playwright/python:v1.48.0-focal AS backend

# Variabili d’ambiente utili per Fly.io
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8080

# Working directory back-end
WORKDIR /app/back-end

# Copia requirements e installa le dipendenze
COPY back-end/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia il codice del back-end
COPY back-end/ .

# Copia il build del front-end statico
COPY --from=frontend-builder /app/front-end/build /app/front-end/build

# Espone la porta (Fly la usa da $PORT, ma serve per compatibilità)
EXPOSE $PORT

# Avvio del server Flask con Gunicorn
CMD ["gunicorn", "server:app", "--bind", "0.0.0.0:8080"]
