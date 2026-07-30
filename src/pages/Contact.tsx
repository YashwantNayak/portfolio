import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import PageWrapper from '../components/PageWrapper'
import { palette, shadows } from '../theme'

// Initialize EmailJS with public key
emailjs.init('U7i2y4MxhwqvpWCBq')

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
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const name = formData.name.trim()
    const email = formData.email.trim()
    const message = formData.message.trim()

    if (!name) {
      setFeedbackMessage('Please enter your full name.')
      setStatus('error')
      return
    }

    if (!email || !validateEmail(email)) {
      setFeedbackMessage('Please enter a valid email address.')
      setStatus('error')
      return
    }

    if (!message) {
      setFeedbackMessage('Please enter your message.')
      setStatus('error')
      return
    }

    setStatus('sending')
    setFeedbackMessage(null)

    try {
      const templateParams = {
        name: name,
        email: email,
        message: message,
        from_name: name,
        from_email: email,
        reply_to: email
      }

      await emailjs.send(
        'service_bakbizp',
        'template_smbsmuq',
        templateParams,
        {
          publicKey: 'U7i2y4MxhwqvpWCBq'
        }
      )

      setStatus('success')
      setFeedbackMessage(null)
      setFormData({ name: '', email: '', message: '' })

      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error: any) {
      console.error('EmailJS Error Object:', error)
      const errDetail = error?.text || error?.message || (typeof error === 'string' ? error : '')
      setStatus('error')
      setFeedbackMessage(
        errDetail
          ? `EmailJS Error: ${errDetail}`
          : 'Something went wrong. Please try again.'
      )
    }
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
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={status === 'sending'}
          />
          <input
            type="email"
            style={inputStyle}
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={status === 'sending'}
          />
        </div>
        <textarea
          style={{ ...inputStyle, minHeight: 180 }}
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          disabled={status === 'sending'}
        />

        <AnimatePresence>
          {status === 'error' && feedbackMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                padding: '14px 20px',
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 500,
                color: '#991b1b',
                background: '#fee2e2',
                border: '1px solid #fca5a5'
              }}
            >
              {feedbackMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="submit"
          style={{
            borderRadius: 999,
            border: 'none',
            padding: '16px 32px',
            background: palette.text,
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
          {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent ✓' : 'Send Message'}
        </motion.button>
      </motion.form>
    </PageWrapper>
  )
}

export default Contact
