import React, { useState } from 'react'
import MyIcon, { type IconName } from './components/MyIcon'
import './App.css'

function App() {
  const [selectedIcon, setSelectedIcon] = useState<IconName>('add')
  const [iconSize, setIconSize] = useState(32)

  // 自定义图标列表
  const customIcons: IconName[] = [
    'add', 'search', 'settings', 'edit', 'delete', 'copy', 
    'home-selected', 'magic-wand'
  ]

  // Material Symbols 图标示例
  const materialSymbols = [
    { name: '10k', class: 'material-symbols-outlined' },
    { name: 'home', class: 'material-symbols-outlined' },
    { name: 'search', class: 'material-symbols-outlined' },
    { name: 'settings', class: 'material-symbols-outlined' },
    { name: 'favorite', class: 'material-symbols-rounded' },
    { name: 'star', class: 'material-symbols-rounded' },
  ]

  // Iconify 图标示例
  const iconifyIcons = [
    'mdi:home',
    'mdi:account',
    'mdi:heart',
    'mdi:star',
    'heroicons:home',
    'heroicons:user',
  ]

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <MyIcon name="settings" size={32} style={{ marginRight: '8px' }} />
          多种图标使用方式演示
        </h1>
        <p>支持自定义图标、Material Symbols 和 Iconify 图标</p>
      </header>

      <main className="app-main">
        {/* 1. 自定义图标 (使用 @iconify/react) */}
        <section className="icon-section">
          <h2>1. 自定义图标 - 使用 @iconify/react</h2>
          <div className="icon-grid">
            {customIcons.map((iconName) => (
              <div 
                key={iconName} 
                className={`icon-item ${selectedIcon === iconName ? 'selected' : ''}`}
                onClick={() => setSelectedIcon(iconName)}
              >
                <MyIcon name={iconName} size={32} color='red'/>
                <span>{iconName}</span>
                <code>&lt;MyIcon name="{iconName}" /&gt;</code>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Material Symbols - CSS 类名方式 */}
        <section className="icon-section">
          <h2>2. Material Symbols - CSS 类名方式</h2>
          <div className="icon-grid">
            {materialSymbols.map((icon, index) => (
              <div key={index} className="icon-item">
                <span className={`${icon.class}`} style={{ fontSize: '32px' }}>
                  {icon.name}
                </span>
                <span>{icon.name}</span>
                <code>&lt;span className="{icon.class}"&gt;{icon.name}&lt;/span&gt;</code>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Iconify 图标 - CSS 类名方式 */}
        <section className="icon-section">
          <h2>3. Iconify 图标 - CSS 类名方式</h2>
          <div className="icon-grid">
            {iconifyIcons.map((iconName, index) => (
              <div key={index} className="icon-item">
                <span 
                  className="iconify" 
                  data-icon={iconName}
                  style={{ fontSize: '32px' }}
                ></span>
                <span>{iconName.split(':')[1]}</span>
                <code>&lt;span className="iconify" data-icon="{iconName}"&gt;&lt;/span&gt;</code>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 您想要的格式示例 */}
        <section className="icon-section">
          <h2>4. 您想要的格式示例</h2>
          <div className="examples-grid">
            <div className="example-item">
              <h3>Material Symbols 10k 图标</h3>
              <div className="example-icon">
                <span className="material-symbols-outlined" style={{ fontSize: '48px' }}>10k</span>
              </div>
              <div className="example-code">
                <code>&lt;span className="material-symbols-outlined"&gt;10k&lt;/span&gt;</code>
              </div>
            </div>
            
            <div className="example-item">
              <h3>Iconify MDI Home 图标</h3>
              <div className="example-icon">
                <span className="iconify" data-icon="mdi:home" style={{ fontSize: '48px' }}></span>
              </div>
              <div className="example-code">
                <code>&lt;span className="iconify" data-icon="mdi:home"&gt;&lt;/span&gt;</code>
              </div>
            </div>
            
            <div className="example-item">
              <h3>自定义图标</h3>
              <div className="example-icon">
                <MyIcon name="magic-wand" size={48} />
              </div>
              <div className="example-code">
                <code>&lt;MyIcon name="magic-wand" size={48} /&gt;</code>
              </div>
            </div>
          </div>
        </section>

        {/* 图标预览控制器 */}
        <section className="icon-preview">
          <h2>图标大小控制器</h2>
          <div className="preview-area">
            <span className="material-symbols-outlined" style={{ fontSize: `${iconSize}px` }}>10k</span>
            <span className="iconify" data-icon="mdi:heart" style={{ fontSize: `${iconSize}px`, margin: '0 20px' }}></span>
            <MyIcon name={selectedIcon} size={iconSize} />
          </div>
          <div className="size-control">
            <label>
              大小: {iconSize}px
              <input
                type="range"
                min="16"
                max="128"
                value={iconSize}
                onChange={(e) => setIconSize(Number(e.target.value))}
              />
            </label>
          </div>
        </section>

        {/* 使用说明 */}
        <section className="usage-info">
          <h2>使用说明</h2>
          <div className="info-cards">
            <div className="info-card">
              <h3>Material Symbols</h3>
              <p>Google 的官方图标库，支持 outlined 和 rounded 两种样式</p>
              <pre><code>{`<span className="material-symbols-outlined">
  icon_name
</span>`}</code></pre>
            </div>
            
            <div className="info-card">
              <h3>Iconify 图标</h3>
              <p>支持超过 100+ 图标库，包括 Material Design Icons、Heroicons 等</p>
              <pre><code>{`<span 
  className="iconify" 
  data-icon="mdi:home"
></span>`}</code></pre>
            </div>
            
            <div className="info-card">
              <h3>自定义图标</h3>
              <p>使用您自己的图标集，通过 addCollection 加载</p>
              <pre><code>{`<MyIcon 
  name="add" 
  size={24} 
/>`}</code></pre>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
