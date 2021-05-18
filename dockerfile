FROM node:latest
LABEL maintainer="Felipe França"
ENV NODE_ENV="production"
COPY /dist /var/wwww/dist
COPY package.json /var/wwww
COPY schema.gql /var/wwww
WORKDIR /var/wwww
RUN npm i --save-prod
ENTRYPOINT npm start
EXPOSE 3333