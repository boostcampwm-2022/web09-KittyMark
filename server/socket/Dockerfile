FROM node:16-alpine
WORKDIR .
COPY ../.. ./socket
RUN npm ci
RUN npm install -g pm2
RUN npm run build
CMD ["pm2-runtime","start","pm2.config.js"]
