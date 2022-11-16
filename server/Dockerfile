FROM node:16-alpine
WORKDIR /app
COPY . ./app
RUN npm install
RUN npm run build
CMD ["npm","run","start:dev"]
