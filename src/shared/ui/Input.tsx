import type { InputHTMLAttributes } from 'react'
import './Input.css'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...props }: InputProps) {
  const classes = ['uiInput', className].filter(Boolean).join(' ')
  return <input className={classes} {...props} />
}
