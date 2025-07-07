import { promises as fs } from 'fs'

const ICONIFY_JSON = 'my-icons.json'
const data = JSON.parse(await fs.readFile(ICONIFY_JSON, 'utf-8'))
const icons = data.icons || {}

for (const [name, icon] of Object.entries(icons)) {
  const body = icon.body || ''
  // 打印所有包含 stroke= 的片段
  const matches = body.match(/stroke\s*=\s*['"][^'"]+['"]/gi)
  if (matches) {
    console.log(`icon: ${name}`)
    for (const m of matches) {
      console.log('  ', m)
    }
  }
} 
