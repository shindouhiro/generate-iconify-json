import { readdir, rename } from 'fs/promises'
import { join } from 'path'

const ICONS_DIR = 'icons'

// 中文到英文映射表
const nameMapping = {
  '上传': 'upload',
  '停止': 'stop',
  '全凭模式-插图': 'full-screen-mode-illustration',
  '全局放大': 'global-zoom',
  '切换': 'switch',
  '删除': 'delete',
  '刷新': 'refresh',
  '加': 'plus',
  '历史对话': 'history-chat',
  '历史记录': 'history-record',
  '叉': 'cross',
  '反馈-成功': 'feedback-success',
  '反馈-通知': 'feedback-notification',
  '圆球': 'circle',
  '复制': 'copy',
  '多选-已选': 'multi-select-selected',
  '多选-未选': 'multi-select-unselected',
  '导航-统一头像': 'navigation-unified-avatar',
  '小箭头': 'small-arrow',
  '应用-已选': 'application-selected',
  '应用-默认': 'application-default',
  '应用商店-已选': 'app-store-selected',
  '应用商店-默认': 'app-store-default',
  '开关-关': 'switch-off',
  '开关-开': 'switch-on',
  '开启新对话': 'start-new-chat',
  '拖拽': 'drag',
  '插件-已选': 'plugin-selected',
  '插件-默认': 'plugin-default',
  '插件中心-创建人头像': 'plugin-center-creator-avatar',
  '插件中心-已选': 'plugin-center-selected',
  '插件中心-默认': 'plugin-center-default',
  '搜索': 'search',
  '数据库-已选': 'database-selected',
  '数据库-默认': 'database-default',
  '智能卡片-默认': 'smart-card-default',
  '智能卡片': 'smart-card',
  '智能工作流': 'smart-workflow',
  '更多- hover': 'more-hover',
  '更多-默认': 'more-default',
  '模型管理-已选': 'model-management-selected',
  '模型管理-选中': 'model-management-active',
  '模型管理-默认': 'model-management-default',
  '注意': 'attention',
  '浮窗模式插图': 'floating-mode-illustration',
  '添加': 'add',
  '用户-默认': 'user-default',
  '用户管理-已选': 'user-management-selected',
  '知识库-已选': 'knowledge-base-selected',
  '知识库-默认': 'knowledge-base-default',
  '箭头下': 'arrow-down',
  '箭头左': 'arrow-left',
  '编辑': 'edit',
  '设置': 'settings',
  '调试': 'debug',
  '轮询工作流': 'polling-workflow',
  '选择框-箭头下': 'select-box-arrow-down',
  '顺序工作流': 'sequential-workflow',
  '首页-已选': 'home-selected',
  '魔法棒': 'magic-wand'
}

async function renameIconFiles() {
  try {
    const files = await readdir(ICONS_DIR)
    const svgFiles = files.filter(f => f.endsWith('.svg'))
    
    console.log(`Found ${svgFiles.length} SVG files to process`)
    
    for (const file of svgFiles) {
      const baseName = file.replace('.svg', '')
      const englishName = nameMapping[baseName]
      
      if (englishName) {
        const oldPath = join(ICONS_DIR, file)
        const newPath = join(ICONS_DIR, `${englishName}.svg`)
        
        try {
          await rename(oldPath, newPath)
          console.log(`✓ Renamed: ${file} → ${englishName}.svg`)
        } catch (error) {
          console.error(`✗ Failed to rename ${file}:`, error.message)
        }
      } else {
        console.log(`? No mapping found for: ${file}`)
      }
    }
    
    console.log('\nRename operation completed!')
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// 执行重命名
await renameIconFiles() 
