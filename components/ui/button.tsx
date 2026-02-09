import Link from 'next/link'

type Variant = 'solid' | 'hollow' | 'ghost'
type Color = 'primary' | 'secondary' | 'dark' | 'white'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  children: React.ReactNode
  variant?: Variant
  color?: Color
  size?: Size
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  onClick?: () => void
}

const baseStyles = 'inline-flex items-center justify-center font-medium transition rounded-lg'

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

const variantStyles: Record<Variant, Record<Color, string>> = {
  solid: {
    primary: 'bg-primary-500 text-white hover:bg-primary-600',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600',
    dark: 'bg-dark-800 text-white hover:bg-dark-900',
    white: 'bg-white text-dark-800 hover:bg-dark-50',
  },
  hollow: {
    primary: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50',
    secondary: 'border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50',
    dark: 'border-2 border-dark-800 text-dark-800 hover:bg-dark-50',
    white: 'border-2 border-white text-white hover:bg-white/10',
  },
  ghost: {
    primary: 'text-primary-500 hover:bg-primary-50',
    secondary: 'text-secondary-500 hover:bg-secondary-50',
    dark: 'text-dark-800 hover:bg-dark-100',
    white: 'text-white hover:bg-white/10',
  },
}

export function Button({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled,
  className = '',
  onClick,
}: Props) {
  const styles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant][color]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={styles}>
      {children}
    </button>
  )
}
