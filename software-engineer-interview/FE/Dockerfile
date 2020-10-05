FROM node

RUN npm install -g serve

COPY urlslugfe /opt/urlslugfe

WORKDIR /opt/urlslugfe

RUN npm install -g serve && \
    npm install && \
    npm run build

CMD serve -s build
