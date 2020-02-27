FROM node:10-alpine
WORKDIR /usr/src/app
COPY package*.json ./

#for serial port
RUN apk add --no-cache make gcc g++ python linux-headers udev


RUN npm install
COPY . .
EXPOSE 4000

CMD ["npm", "start"]