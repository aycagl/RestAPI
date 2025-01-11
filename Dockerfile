FROM node:20
RUN mkdir /app
WORKDIR /app
COPY . .
RUN rm -rf node_modules package-lock.json
RUN npm install

RUN chmod -R 777 /app
RUN npm uninstall bcrypt && npm install --unsafe-perm=true --allow-root bcrypt@latest --save
RUN npm rebuild bcrypt --build-from-source
RUN npm update
EXPOSE 5000

CMD ["node", "server.js"]

