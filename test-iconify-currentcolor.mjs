import { promises as fs } from 'fs'

const ICONIFY_JSON = 'my-icons.json'
const data = JSON.parse(await fs.readFile(ICONIFY_JSON, 'utf-8'))
const icons = data.icons || {}

let failed = []
for (const [name, icon] of Object.entries(icons)) {
  // 检查 body
  const body = icon.body || ''
  const bodyFail =
    /stroke\s*=\s*['"](?!currentColor|none|transparent|url\()[^'"]+['"]/i.test(body) ||
    /fill\s*=\s*['"](?!currentColor|none|transparent|url\()[^'"]+['"]/i.test(body)
  // 检查 props
  const props = icon.props || {}
  const propsFail =
    (typeof props.stroke === 'string' && !/currentColor|none|transparent|url\(/i.test(props.stroke)) ||
    (typeof props.fill === 'string' && !/currentColor|none|transparent|url\(/i.test(props.fill))
  if (bodyFail || propsFail) {
    failed.push({ name, bodyFail, propsFail, stroke: props.stroke, fill: props.fill })
  }
}

if (failed.length === 0) {
  console.log('✅ 所有 icon 的 fill/stroke 都已是 currentColor')
} else {
  console.log('❌ 以下 icon 仍有未替换的 fill/stroke:')
  for (const f of failed) {
    console.log(f.name, f.bodyFail ? 'body' : '', f.propsFail ? 'props' : '', f.stroke || '', f.fill || '')
  }
} 
