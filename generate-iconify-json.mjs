import { promises as fs } from 'fs'
import { importDirectory } from '@iconify/tools'

const ICONS_DIR = 'icons'
const OUTPUT_JSON = 'my-icons.json'

// 自定义 loader：先正则替换 fill/stroke，再交给 iconify/tools
const iconSet = await importDirectory(ICONS_DIR, { includeSubDirs: true }, {
  customLoader: async (file) => {
    let svg = await fs.readFile(file, 'utf-8')
    svg = svg
      .replace(/(fill|stroke)\s*=\s*['"](?!none|transparent|url\()[^'"]*['"]/gi, '$1="currentColor"')
      .replace(/(fill|stroke)\s*:\s*(?!none|transparent|url\()[^;"']*/gi, '$1:currentColor')
    return svg
  }
})

iconSet.prefix = 'my-icons'
await fs.writeFile(OUTPUT_JSON, JSON.stringify(iconSet.export(), null, 2))
console.log('✅ my-icons.json (all icons currentColor) generated for react-use-icons') 
