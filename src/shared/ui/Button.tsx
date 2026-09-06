import type { ButtonHTMLAttributes, ReactNode } from 'react'
import './Button.css'

type ButtonVariant = 'primary' | 'ghost' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  children: ReactNode
}

export function Button({
  variant = 'primary',
  className,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = ['uiButton', `uiButton--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
