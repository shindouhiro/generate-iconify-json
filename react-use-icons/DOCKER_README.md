# Docker 打包和部署指南

本項目提供了完整的 Docker 打包和部署解決方案。

## 文件結構

- `Dockerfile` - 多階段構建配置
- `.dockerignore` - Docker 構建忽略文件
- `nginx.conf` - 自定義 Nginx 配置
- `docker-compose.yml` - Docker Compose 配置
- `.github/workflows/docker-build-deploy.yml` - GitHub Actions 自動化部署
- `deploy/restart_services.sh` - 服務器部署腳本
- `GITHUB_SECRETS.md` - GitHub Secrets 配置指南

## 快速開始

### 1. 構建生產鏡像

```bash
# 構建 Docker 鏡像
docker build -t react-use-icons .

# 運行容器
docker run -d -p 3000:80 --name react-use-icons-app react-use-icons
```

### 2. 使用 Docker Compose

```bash
# 啟動生產環境
docker-compose up -d

# 啟動開發環境
docker-compose --profile dev up -d

# 停止服務
docker-compose down
```

### 3. 查看應用

- 生產環境：http://localhost:3000
- 開發環境：http://localhost:5173

## 構建階段說明

### 第一階段：依賴安裝 (deps)
- 安裝生產依賴
- 優化緩存層

### 第二階段：應用構建 (builder)
- 安裝所有依賴
- 執行 TypeScript 編譯
- 執行 Vite 構建

### 第三階段：生產環境 (production)
- 使用 Nginx Alpine 鏡像
- 複製構建產物
- 配置 Web 服務器

## 自定義配置

### Nginx 配置

`nginx.conf` 文件包含以下優化：

- Gzip 壓縮
- 靜態資源緩存
- 安全頭部
- React Router 支持
- 健康檢查端點

### 環境變量

如需配置環境變量，可以在 `docker-compose.yml` 中添加：

```yaml
environment:
  - NODE_ENV=production
  - VITE_API_URL=https://api.example.com
```

## 自動化構建和推送 (GitHub Actions)

### 1. 配置 GitHub Secrets

在 GitHub 倉庫設置中配置以下 Secrets：

- `DOCKERHUB_USERNAME` - Docker Hub 用戶名
- `DOCKERHUB_TOKEN` - Docker Hub 訪問令牌

詳細配置說明請參考 `GITHUB_SECRETS.md`。

### 2. 自動構建流程

1. 推送代碼到 `main` 分支
2. GitHub Actions 自動觸發構建
3. 構建 Docker 鏡像並推送到 Docker Hub

### 3. 手動觸發構建

```bash
# 在 GitHub 倉庫頁面
# Actions → Docker Build and Push → Run workflow
```

## 手動部署到生產環境

### 1. 構建並推送鏡像

```bash
# 構建鏡像
docker build -t your-registry/react-use-icons:latest .

# 推送鏡像
docker push your-registry/react-use-icons:latest
```

### 2. 在服務器上部署

```bash
# 拉取鏡像
docker pull your-registry/react-use-icons:latest

# 運行容器
docker run -d \
  -p 80:80 \
  --name react-use-icons \
  --restart unless-stopped \
  your-registry/react-use-icons:latest
```

## 故障排除

### 常見問題

1. **構建失敗**
   ```bash
   # 清理 Docker 緩存
   docker system prune -a
   ```

2. **端口衝突**
   ```bash
   # 檢查端口使用情況
   docker ps
   lsof -i :3000
   ```

3. **容器無法啟動**
   ```bash
   # 查看容器日誌
   docker logs react-use-icons-app
   ```

### 健康檢查

應用提供健康檢查端點：`/health`

```bash
curl http://localhost:3000/health
```

## 性能優化

- 多階段構建減少鏡像大小
- Nginx 配置優化靜態資源服務
- Gzip 壓縮減少傳輸大小
- 適當的緩存策略

## 安全考慮

- 使用 Alpine Linux 基礎鏡像
- 配置安全頭部
- 最小化攻擊面
- 定期更新基礎鏡像

