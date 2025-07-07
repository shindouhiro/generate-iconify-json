import { useState, useRef } from 'react'
import MyIcon from './components/MyIcon'
import myIcons from '../../my-icons.json'

function App() {
  const allIconNames = Object.keys(myIcons.icons)
  const [copied, setCopied] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const codeRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const handleCopy = (iconName: string) => {
    const code = codeRefs.current[iconName]?.innerText || ''
    if (code) {
      navigator.clipboard.writeText(code)
      setCopied(iconName)
      setTimeout(() => setCopied(null), 1200)
    }
  }

  const filteredIcons = allIconNames.filter(name => name.toLowerCase().includes(search.trim().toLowerCase()))

  return (
    <div className="w-full  bg-gradient-to-b from-violet-50 via-white to-violet-100 flex flex-col items-center py-8 px-2 ">
      <header className="mb-8 text-center w-full">
        <h1 className="text-3xl font-bold text-violet-900 mb-2 drop-shadow">所有自定义图标一览</h1>
        <p className="text-gray-500 mb-4">共 {allIconNames.length} 个图标，可直接在项目中使用</p>
        <input
          className="w-full max-w-xs px-4 py-2 rounded-lg border border-violet-200 bg-white text-violet-900 focus:outline-none focus:border-violet-400 shadow-sm transition mb-2"
          type="text"
          placeholder="搜索图标名..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </header>
      <main className="w-full flex flex-col items-center">
        <section className="w-full">
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredIcons.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-12 text-lg">未找到相关图标</div>
            )}
            {filteredIcons.map(iconName => (
              <div
                key={iconName}
                className="icon-card relative flex flex-col items-center bg-white/90 rounded-2xl shadow-md border border-violet-100 px-2 py-6 min-h-[200px] transition-transform duration-200 hover:scale-105 hover:shadow-xl hover:border-violet-300"
              >
                <button
                  className="absolute right-3 top-3 z-10 p-1 rounded-full bg-violet-50 hover:bg-violet-200 border border-violet-100 text-violet-500 hover:text-violet-700 transition-colors duration-150 shadow-sm"
                  title="复制用法"
                  onClick={() => handleCopy(iconName)}
                >
                  {copied === iconName ? (
                    <span className="i-heroicons-check-20-solid text-green-500 w-5 h-5" />
                  ) : (
                    <span className="i-heroicons-clipboard-document-20-solid w-5 h-5" />
                  )}
                </button>
                <div className="icon-card-icon flex items-center justify-center mb-4">
                  <MyIcon name={iconName as unknown as import('./components/MyIcon').IconName} size={64} />
                </div>
                <div className="icon-card-info w-full flex flex-col items-center">
                  <div className="icon-card-title text-base font-semibold text-violet-700 mb-1 break-all text-center">{iconName}</div>
                  <div
                    className="icon-card-code text-xs bg-violet-50 text-violet-600 rounded px-2 py-1 font-mono text-center whitespace-nowrap mt-1 shadow-sm"
                    ref={el => { codeRefs.current[iconName] = el }}
                  >{`<MyIcon name="${iconName}" />`}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
