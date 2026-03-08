FROM node:22-alpine

WORKDIR /portfolio

COPY package*.json ./
COPY pnpm*.yaml ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]