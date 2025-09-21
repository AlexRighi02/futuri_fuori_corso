# ===== STAGE 1: Build del front-end =====
FROM node:20-slim AS frontend-builder

WORKDIR /app/front-end

# Copia e installa dipendenze
COPY front-end/package*.json ./
RUN npm install --omit=dev

# Copia codice sorgente e build
COPY front-end/ ./
RUN npm run build


# ===== STAGE 2: Back-end con Python e Flask =====
FROM python:3.11-slim

WORKDIR /app/back-end

# Copia i requirements e installa dipendenze
COPY back-end/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copia il codice back-end
COPY back-end/ .

# Copia il build del front-end
COPY --from=frontend-builder /app/front-end/build /app/front-end/build

# Espone la porta
EXPOSE 8080

# Avvio server Flask con Gunicorn
CMD ["gunicorn", "server:app", "--bind", "0.0.0.0:8080"]
