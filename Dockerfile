# BUILD REACT APP
# FROM  node:16-alpine3.14 as build

# WORKDIR /app

# COPY package.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# CREATE NGINX SERVER
# Por cuestiones prácticas, únicamente copiamos
# el build que ya generó el Jenkins a la carpeta
# de Nginx
FROM nginx:1.21.3-alpine

# COPY --from=build /app/build /usr/share/nginx/html
COPY ./build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
