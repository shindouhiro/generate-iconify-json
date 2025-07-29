import React from 'react'
import { Icon, addCollection } from '@iconify/react'
import customIcons from '../../../my-icons.json'

// 加载自定义图标集
addCollection(customIcons)

// 定义图标名称类型 - 包含所有在 my-icons.json 中定义的图标
export type IconName = `${keyof typeof customIcons.icons}`

// 图标组件的属性类型
interface MyIconProps {
  name: `my-icons:${IconName}` | string
  size?: number
  color?: string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const MyIcon: React.FC<MyIconProps> = ({ 
  name, 
  size = 24, 
  color, 
  className, 
  style, 
  onClick 
}) => {
  return (
    <Icon
      icon={`${name}`}
      width={size}
      height={size}
      color={color}
      className={className}
      style={style}
      onClick={onClick}
    />
  )
}

export default MyIcon
