# Etapa 1: Build
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Compilar la aplicación
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine AS production

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Copiar base de datos (si es necesario)
# COPY ./database.sqlite ./database.sqlite

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Copiar archivos compilados desde la etapa de build
COPY --from=builder /app/dist ./dist

# Exponer el puerto (ajusta según tu configuración)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]