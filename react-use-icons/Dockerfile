# 多階段構建 Dockerfile for React Use Icons

# 第一階段：依賴安裝
FROM node:22-alpine AS deps
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm ci --only=production && npm cache clean --force

# 第二階段：構建應用
FROM node:22-alpine AS builder
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝所有依賴（包括開發依賴）
RUN npm ci

# 複製源代碼
COPY . .

# 構建應用
RUN npm run build

# 第三階段：生產環境
FROM nginx:alpine AS production

# 複製構建產物到 nginx 目錄
COPY --from=builder /app/dist /usr/share/nginx/html

# 複製自定義 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"]
