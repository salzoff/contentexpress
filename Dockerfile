FROM node:10

WORKDIR /dist

COPY . .

EXPOSE 7070

CMD ["npm", "run prod"]