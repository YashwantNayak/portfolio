import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { palette, shadows, radii } from '../theme'

const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

const IconDownload = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const PdfCanvasViewer: React.FC<{ pdfUrl: string }> = ({ pdfUrl }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    let isMounted = true

    const loadPdf = async () => {
      try {
        setLoading(true)
        setError(false)

        if (!(window as any).pdfjsLib) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = PDFJS_CDN
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        const pdfjsLib = (window as any).pdfjsLib
        pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER

        const loadingTask = pdfjsLib.getDocument(pdfUrl)
        const pdf = await loadingTask.promise

        if (!isMounted) return

        if (containerRef.current) {
          containerRef.current.innerHTML = ''
          const containerWidth = containerRef.current.clientWidth || 900

          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum)
            const unscaledViewport = page.getViewport({ scale: 1.0 })
            const scale = Math.max(1.5, (containerWidth * 2) / unscaledViewport.width)
            const viewport = page.getViewport({ scale })

            const canvas = document.createElement('canvas')
            const context = canvas.getContext('2d')
            if (!context) continue

            canvas.height = viewport.height
            canvas.width = viewport.width

            canvas.style.width = '100%'
            canvas.style.height = 'auto'
            canvas.style.display = 'block'
            canvas.style.borderRadius = '16px'

            const renderContext = {
              canvasContext: context,
              viewport: viewport
            }
            await page.render(renderContext).promise
            if (containerRef.current && isMounted) {
              containerRef.current.appendChild(canvas)
            }
          }
        }
        setLoading(false)
      } catch (err) {
        console.error('PDF Canvas Render Error:', err)
        if (isMounted) {
          setError(true)
          setLoading(false)
        }
      }
    }

    loadPdf()

    return () => {
      isMounted = false
    }
  }, [pdfUrl])

  if (error) {
    return (
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
        style={{ width: '100%', height: '1100px', border: 'none', borderRadius: 16 }}
        title="Resume PDF"
      />
    )
  }

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {loading && (
        <div style={{ padding: '80px 20px', textAlign: 'center', color: 'rgba(0,0,0,0.4)', fontSize: 14 }}>
          Loading PDF document...
        </div>
      )}
      <div ref={containerRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }} />
    </div>
  )
}

const Thoughts: React.FC = () => {
  return (
    <PageWrapper
      sectionId="resume"
      title="Resume"
      subtitle="View and download my official Curriculum Vitae."
    >
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Top Header Card: Title & Download Button */}
        <div
          style={{
            borderRadius: radii.lg || 24,
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: shadows.soft,
            padding: '24px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
            boxSizing: 'border-box'
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: palette.text, letterSpacing: -0.5 }}>
              Yashwant Nayak
            </h2>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: 'rgba(0,0,0,0.5)', fontWeight: 500 }}>
              Software Engineer · Official Curriculum Vitae
            </p>
          </div>

          <motion.a
            href="/resume.pdf"
            download="Yashwant_Nayak_Resume.pdf"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 28px',
              fontSize: 14,
              fontWeight: 600,
              color: '#ffffff',
              background: '#000000',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              textDecoration: 'none'
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 12px 30px rgba(0,0,0,0.25)' }}
            whileTap={{ scale: 0.96 }}
          >
            <IconDownload />
            Download Resume
          </motion.a>
        </div>

        {/* Separate Bottom Card for PDF Reflection */}
        <div
          style={{
            borderRadius: radii.lg || 24,
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: shadows.soft,
            padding: '20px',
            boxSizing: 'border-box',
            overflow: 'hidden'
          }}
        >
          <PdfCanvasViewer pdfUrl="/resume.pdf" />
        </div>
      </div>
    </PageWrapper>
  )
}

export default Thoughts
