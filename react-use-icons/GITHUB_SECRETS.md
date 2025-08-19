# GitHub Secrets 配置指南

為了使用 GitHub Actions 自動構建和部署 Docker 鏡像，您需要在 GitHub 倉庫中配置以下 Secrets。

## 必需的 Secrets

### Docker Hub 憑證

#### `DOCKERHUB_USERNAME`
- **描述**: Docker Hub 用戶名
- **類型**: Secret
- **示例**: `shindouhiro`

#### `DOCKERHUB_TOKEN`
- **描述**: Docker Hub 訪問令牌（不是密碼）
- **類型**: Secret
- **獲取方式**:
  1. 登錄 [Docker Hub](https://hub.docker.com/)
  2. 進入 Account Settings → Security
  3. 點擊 "New Access Token"
  4. 設置令牌名稱（如：github-actions）
  5. 複製生成的令牌

## 配置步驟

### 1. 進入 GitHub 倉庫設置

1. 打開您的 GitHub 倉庫
2. 點擊 "Settings" 標籤
3. 在左側菜單中選擇 "Secrets and variables" → "Actions"

### 2. 添加 Secrets

點擊 "New repository secret" 按鈕，依次添加：

| Name | Value |
|------|-------|
| `DOCKERHUB_USERNAME` | 您的 Docker Hub 用戶名 |
| `DOCKERHUB_TOKEN` | 您的 Docker Hub 訪問令牌 |

### 3. 驗證配置

添加完成後，您應該看到類似這樣的列表：

```
DOCKERHUB_USERNAME    ●●●●●●●●●●
DOCKERHUB_TOKEN       ●●●●●●●●●●
```

## 安全注意事項

### 1. 令牌安全
- 定期輪換 Docker Hub 訪問令牌
- 使用最小權限原則
- 不要將令牌提交到代碼倉庫

### 2. 令牌安全
- 定期輪換 Docker Hub 訪問令牌
- 使用最小權限原則
- 不要將令牌提交到代碼倉庫

## 故障排除

### 常見問題

1. **Docker Hub 登錄失敗**
   - 檢查用戶名和令牌是否正確
   - 確認令牌有推送權限

2. **權限錯誤**
   - 確認 GitHub Actions 有讀取倉庫內容的權限
   - 確認 Docker Hub 令牌有推送權限

### 測試連接

在配置完成後，您可以手動觸發工作流程來測試：

1. 進入 "Actions" 標籤
2. 選擇 "Docker Build and Deploy" 工作流程
3. 點擊 "Run workflow"
4. 選擇分支並運行

## 更新 Secrets

如果需要更新任何 Secret：

1. 進入 Settings → Secrets and variables → Actions
2. 點擊要更新的 Secret 名稱
3. 點擊 "Update" 按鈕
4. 輸入新值並保存

**注意**: 更新 Secret 後，正在運行的工作流程不會自動使用新值，需要重新觸發。
