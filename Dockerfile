FROM node:8.9.3
ADD tmp.tgz /
RUN npm i \
  && npm run build
EXPOSE 17100
ENTRYPOINT ["npm", "run", "start"]
