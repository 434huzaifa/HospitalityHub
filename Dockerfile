    FROM node:20

    WORKDIR /app

    COPY package*.json ./

    RUN npm install

    COPY src ./src
        
    COPY public ./public

    COPY tsconfig.json ./

    RUN npm run build

    ENV TOKEN=trbjhJ5qDQdhovRHxaAasz8esSSGMAtGizEAeuAep55zwsPL4nPePr5iAdwUPTVjLfiLZqrNfejwC9VPoWUvg9QBvZahes7NefBAt7tRzUcPFWPHuCR88A6EshmkEWt3

    EXPOSE 3000

    RUN rm -rf src

    CMD ["node", "dist/index.js"]