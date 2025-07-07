import React from 'react'
import { Icon, addCollection } from '@iconify/react'
import customIcons from '../../../my-icons.json'

// 加载自定义图标集
addCollection(customIcons)

// 定义图标名称类型
export type IconName = 'add' | 'search' | 'settings' | 'edit' | 'delete' | 'copy' | 'home-selected' | 'user-default' | 'upload' | 'refresh' | 'plus' | 'magic-wand'

// 图标组件的属性类型
interface MyIconProps {
  name: IconName
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
      icon={`my-icons:${name}`}
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
