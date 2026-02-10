#!/bin/bash

# Configuración del bucket
BUCKET_NAME="platform-kerbrum/pya-website"
S3_URI="s3://$BUCKET_NAME"

echo "========================================"
echo "Iniciando despliegue de Frontend a S3"
echo "Destino: $S3_URI"
echo "========================================"

# Sincronizar archivos estáticos
# 1. Excluir todo por defecto para evitar subir archivos de backend o configuración
# 2. Incluir explícitamente carpetas y archivos del frontend
aws s3 sync . "$S3_URI" \
    --delete \
    --exclude "*" \
    --include "index.html" \
    --include "css/*" \
    --include "js/*" \
    --include "img/*" \
    --include "pages/*" \
    --cache-control "max-age=0, no-cache, no-store, must-revalidate" \
    --content-type "text/html" --exclude "*" --include "*.html" # Forzar content-type correcto para HTML si es necesario

# Nota: El comando anterior hace un sync general. 
# Para asegurar tipos de contenido y caché, a veces es mejor ser específico o confiar en la detección automática de aws cli.
# Simplificamos al comando robusto:

echo "Sincronizando..."
aws s3 sync . "$S3_URI" \
    --delete \
    --exclude "*" \
    --include "index.html" \
    --include "css/*" \
    --include "js/*" \
    --include "img/*" \
    --include "pages/*"

echo "========================================"
echo "Despliegue completado."
echo "========================================"
