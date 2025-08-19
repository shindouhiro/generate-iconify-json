# GitHub Actions 測試文件

這個文件用於測試 GitHub Actions 工作流程是否正常觸發。

## 觸發條件

- 推送到 `main` 分支
- 推送到 `master` 分支
- 創建 Pull Request 到 `main` 或 `master` 分支

## 預期結果

當推送此文件時，應該會觸發：
1. Docker 鏡像構建
2. 推送到 Docker Hub
3. 顯示構建結果

---
創建時間: $(date)
