# stage 1
FROM node:alpine AS angular-users-crud
WORKDIR /app  
COPY . .
RUN npm install
RUN npm run build

# stage 2
FROM nginx:alpine
COPY --from=angular-users-crud /app/dist/angular-users-crud /usr/share/nginx/html
EXPOSE 80

# docker build -t pesho02/users-crud:latest .
# docker push pesho02/users-crud