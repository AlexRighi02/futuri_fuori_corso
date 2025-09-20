# ===== STAGE 1: Build del front-end =====
FROM node:20-slim AS frontend-builder

WORKDIR /app/front-end

# Copia solo package.json per cache layer
COPY front-end/package*.json ./
RUN npm ci --omit=dev

# Copia i sorgenti e build
COPY front-end/ ./
RUN npm run build


# ===== STAGE 2: Back-end con Python + Playwright =====
FROM mcr.microsoft.com/playwright/python:v1.47.0-focal

WORKDIR /app/back-end

# Variabili ambiente
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8080

# Copia requirements e installa
COPY back-end/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia il codice back-end
COPY back-end/ .

# Copia build front-end
COPY --from=frontend-builder /app/front-end/build /app/front-end/build

# Espone la porta
EXPOSE $PORT

# Usa un singolo worker per evitare problemi con Chromium
CMD ["gunicorn", "server:app", "--workers", "1", "--threads", "8", "--bind", "0.0.0.0:8080"]
