FROM node

WORKDIR /app

COPY package.json .

RUN npm install -g serve

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["server", "-s", "dist"]