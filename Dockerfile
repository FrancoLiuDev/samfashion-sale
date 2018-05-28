FROM node:8.11.2
ADD tmp.tgz /
RUN npm i \
  && npm run build
EXPOSE 17100
ENTRYPOINT ["npm", "run", "start"]
