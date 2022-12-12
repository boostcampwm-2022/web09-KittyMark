FROM node:16-alpine
WORKDIR .
COPY . .
RUN npm ci
RUN npm install -g pm2
RUN npm run build
CMD ["pm2-runtime","start","./dist/main.js", "--name","kittymark","-i", "max"]
