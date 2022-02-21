# Step 1 (ts to js complie)
## base image for Step 1: Node 10
FROM node:12 AS builder
WORKDIR /app
## 프로젝트의 모든 파일을 WORKDIR(/app)로 복사한다
COPY . .
## Nest.js project를 build 한다
RUN npm install
RUN npm run build


# Step 2 (node alpine image로 complie된 application을 실행)
## base image for Step 2: Node 10-alpine(light weight)
FROM node:12
WORKDIR /app
## Step 1의 builder에서 build된 프로젝트를 가져온다
COPY --from=builder /app ./
## application 실행
EXPOSE 3000
CMD ["npm", "run", "start:prod"]



## declare base image - node 16 ==== FOR YARN

##FROM node:16.4.2-alpine3.11 AS builder
##WORKDIR /app
##COPY . .
## project dependency install
##RUN yarn
##RUN yarn run build

##FROM node:16.4.2-alpine3.11
##WORKDIR /usr/src/app
##COPY --from=builder /app ./

##EXPOSE 3000
##CMD yarn start:prod