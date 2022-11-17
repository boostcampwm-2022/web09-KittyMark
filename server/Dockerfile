FROM node:16-alpine
WORKDIR .
COPY . .
RUN npm install
RUN npm run build
CMD ["npm","run","start:dev"]
