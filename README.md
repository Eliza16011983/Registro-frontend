# Frontend - Registro de Usuarios - Microservicio de Interfaz Web

Este servicio corresponde a la interfaz web de la aplicación de registro de usuarios.
Es una aplicación estática (HTML + CSS + JavaScript) servida por un contenedor Nginx.
Su función es permitir a los usuarios crear y visualizar registros consumiendo la API del backend desplegada en Kubernetes.

##Funcionalidades
- Formulario para registrar usuarios.
- Visualización de usuarios existentes.
- Comunicación con el backend mediante llamadas fetch() hacia /api/users/.

## Tecnologías
- HTML
- CSS
- JavaScript

## Estructura
-  index.html : página principal
-  script.js: lógica de envío de datos al backend
-  style.css : estilos básicos
- 'k8s/':
   deployment.yaml
   service.yaml
- Dockerfile

##Flujo de trabajo
1-El usuario ingresa al LoadBalancer del frontend.
2-Nginx entrega los archivos estáticos.
3-script.js llama al endpoint del backend:
    http://<BACKEND-LB>/api/users/
4-Se actualiza la tabla en pantalla.


##Instrucciones de despliegue
docker build -t frontend:latest .
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get svc frontend-svc

##Nota:
El Service es tipo LoadBalancer, ya que debe ser accesible públicamente. 
