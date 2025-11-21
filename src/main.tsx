import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const fontStack = 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
document.documentElement.style.backgroundColor = '#f7f7f7'
document.body.style.margin = '0'
document.body.style.fontFamily = fontStack
document.body.style.background = '#f7f7f7'
document.body.style.color = '#000'
document.body.style.minHeight = '100vh'

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
