FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/ .bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# PRODUCTION ENVIRONMENT
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html

# NEW
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD [ "nginx", "-g", "daemon off;" ]