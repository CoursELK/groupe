FROM node:22
RUN mkdir /client
WORKDIR /client
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]
