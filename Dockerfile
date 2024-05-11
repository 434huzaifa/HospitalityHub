FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src ./src

COPY tsconfig.json ./

RUN npm run build

ENV DB_URL=mongodb+srv://434darkmaster:RgcRm54Gix9NnIMH@cluster0.l2bfny4.mongodb.net/HospitalityHub?retryWrites=true&w=majority&appName=Cluster0

ENV TOKEN=trbjhJ5qDQdhovRHxaAasz8esSSGMAtGizEAeuAep55zwsPL4nPePr5iAdwUPTVjLfiLZqrNfejwC9VPoWUvg9QBvZahes7NefBAt7tRzUcPFWPHuCR88A6EshmkEWt3

EXPOSE 3000

CMD ["node", "dist/index.js"]