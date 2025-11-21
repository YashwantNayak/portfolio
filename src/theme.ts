import { CSSProperties } from 'react'

export const palette = {
  background: '#ffffff',
  subtle: '#f7f7f7',
  text: '#000000',
  muted: 'rgba(0,0,0,0.6)',
  outline: 'rgba(0,0,0,0.08)'
}

export const radii = {
  xl: 40,
  lg: 28,
  md: 20,
  sm: 12
}

export const shadows = {
  soft: '0 30px 80px rgba(15, 23, 42, 0.08)',
  hover: '0 20px 50px rgba(15, 23, 42, 0.12)',
  deep: '0 40px 120px rgba(5, 5, 5, 0.45)'
}

export const blurBackdrop = 'blur(18px)'

export const motionPreset = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
}

export const sectionStyle: CSSProperties = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 28
}

export const baseCard: CSSProperties = {
  background: palette.background,
  borderRadius: radii.lg,
  border: `1px solid ${palette.outline}`,
  boxShadow: shadows.soft,
  padding: 32
}

export const subtleCard: CSSProperties = {
  ...baseCard,
  background: palette.subtle,
  boxShadow: 'none'
}
