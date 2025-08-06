#Build
FROM node:slim AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build


#Production
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off"]