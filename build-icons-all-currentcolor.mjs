// 一键式批量生成 iconify JSON 并确保所有 fill/stroke 为 currentColor
// 步骤：
// 1. 用 customLoader 生成 my-icons.json（不动原始 SVG）
// 2. 用 fix-json-currentcolor.mjs 强制替换 JSON 里所有 fill/stroke
// 3. 用 test-iconify-currentcolor.mjs 检查最终 JSON

import { promises as fs } from 'fs'
import { importDirectory } from '@iconify/tools'
import { exec as _exec } from 'child_process'
import { promisify } from 'util'
const exec = promisify(_exec)

const ICONS_DIR = 'icons'
const OUTPUT_JSON = 'my-icons.json'

// 1. 生成 JSON，customLoader 替换 fill/stroke
console.log('Step 1: 生成 my-icons.json（customLoader 替换 fill/stroke）...')
const iconSet = await importDirectory(ICONS_DIR, undefined, {
  customLoader: async (file) => {
    let svg = await fs.readFile(file, 'utf-8')
    svg = svg
      .replace(/(fill|stroke)\s*=\s*['\"](?!none|transparent|url\()[^'\"]+['\"]/gi, '$1="currentColor"')
      .replace(/(fill|stroke)\s*:\s*(?!none|transparent|url\()[^;"']*/gi, '$1:currentColor')
    return svg
  }
})
iconSet.prefix = 'my-icons'
await fs.writeFile(OUTPUT_JSON, JSON.stringify(iconSet.export(), null, 2))
console.log('✅ my-icons.json 生成完成')

// 2. 强制修正 JSON 里所有 fill/stroke
console.log('Step 2: 强制修正 my-icons.json 里所有 fill/stroke...')
await exec('node fix-json-currentcolor.mjs')
console.log('✅ my-icons.json 强制修正完成')

// 3. 检查最终 JSON
console.log('Step 3: 检查最终 my-icons.json 是否全部 currentColor...')
await exec('node test-iconify-currentcolor.mjs')
console.log('✅ 检查完成，若无 ❌ 则全部 currentColor') 
