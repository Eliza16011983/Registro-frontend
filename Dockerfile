FROM nginx:1.29.2

# Configuración de Nginx (la que acabamos de crear)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Archivos estáticos
COPY index.html /usr/share/nginx/html/index.html
COPY script.js /usr/share/nginx/html/script.js
