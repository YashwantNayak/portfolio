import React from 'react'

interface Props { name?: string }

const Hello: React.FC<Props> = ({ name = 'World' }) => {
  const headingStyle: React.CSSProperties = {
    margin: 0,
    fontSize: 28,
    color: '#0f172a'
  }

  const badgeStyle: React.CSSProperties = {
    display: 'inline-block',
    marginLeft: 12,
    padding: '4px 8px',
    borderRadius: 8,
    background: '#eef2ff',
    color: '#6366f1',
    fontSize: 12
  }

  return (
    <div>
      <h1 style={headingStyle}>Hello, {name} <span style={badgeStyle}>React + Vite</span></h1>
    </div>
  )
}

export default Hello
