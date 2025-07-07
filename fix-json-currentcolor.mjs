import { promises as fs } from 'fs'

const ICONIFY_JSON = 'my-icons.json'
const data = JSON.parse(await fs.readFile(ICONIFY_JSON, 'utf-8'))
const icons = data.icons || {}

for (const icon of Object.values(icons)) {
  if (icon.body) {
    icon.body = icon.body
      .replace(/(fill|stroke)\s*=\s*['"](?!none|transparent|url\()[^'"]+['"]/gi, '$1="currentColor"')
      .replace(/(fill|stroke)\s*:\s*(?!none|transparent|url\()[^;"']*/gi, '$1:currentColor')
  }
}
await fs.writeFile(ICONIFY_JSON, JSON.stringify(data, null, 2))
console.log('✅ my-icons.json 已强制替换所有 fill/stroke 为 currentColor') 
