FROM node:8.9.3
ADD tmp.tgz /
COPY .babelrc /.babelrc
COPY .postcssrc.js /.postcssrc.js
RUN npm i \
  && npm run build
EXPOSE 17100
ENTRYPOINT ["npm", "run", "start"]
