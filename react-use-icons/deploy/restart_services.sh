#!/bin/bash

# React Use Icons 服務重啟腳本
# 用於 GitHub Actions 自動部署

set -e

# 配置變量
IMAGE_NAME="shindouhiro/react-use-icons"
CONTAINER_NAME="react-use-icons-app"
PORT="3000"

echo "🚀 開始部署 React Use Icons 應用..."

# 拉取最新鏡像
echo "📥 拉取最新 Docker 鏡像..."
docker pull ${IMAGE_NAME}:latest

# 停止並移除舊容器
echo "🛑 停止舊容器..."
docker stop ${CONTAINER_NAME} 2>/dev/null || true
docker rm ${CONTAINER_NAME} 2>/dev/null || true

# 運行新容器
echo "▶️  啟動新容器..."
docker run -d \
  --name ${CONTAINER_NAME} \
  --restart unless-stopped \
  -p ${PORT}:80 \
  --health-cmd="curl -f http://localhost/health || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  ${IMAGE_NAME}:latest

# 等待容器啟動
echo "⏳ 等待容器啟動..."
sleep 10

# 檢查容器狀態
if docker ps | grep -q ${CONTAINER_NAME}; then
    echo "✅ 容器啟動成功！"
    echo "🌐 應用訪問地址: http://localhost:${PORT}"
    
    # 顯示容器信息
    echo "📊 容器信息:"
    docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
else
    echo "❌ 容器啟動失敗！"
    echo "📋 容器日誌:"
    docker logs ${CONTAINER_NAME} || true
    exit 1
fi

# 清理未使用的鏡像
echo "🧹 清理未使用的 Docker 鏡像..."
docker image prune -f

echo "🎉 部署完成！"
