import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { palette, shadows } from '../theme'

const formStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 24
}

const inputStyle: React.CSSProperties = {
  borderRadius: 18,
  border: '1px solid rgba(0,0,0,0.1)',
  padding: '16px 20px',
  fontSize: 16,
  fontFamily: 'inherit',
  background: palette.subtle
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: 'Budget',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('sending')

    // Create mailto link with form data
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}`
    )
    const mailtoLink = `mailto:your-email@example.com?subject=${subject}&body=${body}`

    // Open email client
    window.location.href = mailtoLink

    // Show success message
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => {
        setStatus('idle')
        setFormData({ name: '', email: '', budget: 'Budget', message: '' })
      }, 3000)
    }, 500)
  }

  return (
    <PageWrapper
      sectionId="contact"
      title="Let's Connect"
      subtitle="Tell me about the product, the vibe, and the impossible feeling you're chasing."
    >
      <motion.form
        style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onSubmit={handleSubmit}
      >
        <div style={formStyle}>
          <input
            style={inputStyle}
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="email"
            style={inputStyle}
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <select
            style={inputStyle}
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            required
          >
            <option value="Budget" disabled>
              Budget
            </option>
            <option>$5k - $10k</option>
            <option>$10k - $25k</option>
            <option>$25k+</option>
          </select>
        </div>
        <textarea
          style={{ ...inputStyle, minHeight: 180 }}
          placeholder="Project details"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
        <motion.button
          type="submit"
          style={{
            borderRadius: 999,
            border: 'none',
            padding: '16px 32px',
            background: status === 'success' ? '#10b981' : palette.text,
            color: '#fff',
            fontSize: 16,
            letterSpacing: 1,
            boxShadow: shadows.hover,
            cursor: status === 'sending' ? 'wait' : 'pointer'
          }}
          whileHover={{ scale: status === 'sending' ? 1 : 1.05 }}
          whileTap={{ scale: status === 'sending' ? 1 : 0.95 }}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Opening Email...' : status === 'success' ? 'Email Opened ✓' : 'Send Message'}
        </motion.button>
      </motion.form>
    </PageWrapper>
  )
}

export default Contact
