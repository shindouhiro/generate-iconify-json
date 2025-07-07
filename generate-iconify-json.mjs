import { promises as fs } from 'fs'
import { importDirectory, cleanupSVG, parseColors } from '@iconify/tools'

const ICONS_DIR = 'icons'
const OUTPUT_JSON = 'my-icons.json'

const iconSet = await importDirectory(ICONS_DIR, (name, data) => {
  // 变色
  parseColors(data, {
    defaultColor: 'currentColor',
    callback: () => 'currentColor'
  })
  cleanupSVG(data)
  // 兼容对象和字符串
  let body = typeof data === 'string' ? data : data.body
  if (!body) return data
  // 替换
  body = body
    .replace(/(fill|stroke)\s*=\s*['"](?!none|transparent|url\()[^'"]*['"]/gi, '$1="currentColor"')
    .replace(/(fill|stroke)\s*:\s*(?!none|transparent|url\()[^;"']*/gi, '$1:currentColor')
  if (typeof data === 'string') return body
  data.body = body
  return data
})

iconSet.prefix = 'my-icons'
console.log(iconSet,'iconSet.export()')
await fs.writeFile(OUTPUT_JSON, JSON.stringify(iconSet.export(), null, 2))
console.log('✅ my-icons.json (all icons currentColor) generated for react-use-icons') 
