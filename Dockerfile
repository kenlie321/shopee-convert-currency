FROM node:carbon

#App directory
WORKDIR /xampp/htdocs/shopee-convert-currency

#install APP Dependency
COPY package*.json ./

RUN npm install

#bundle app source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]