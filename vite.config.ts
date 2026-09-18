import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-save-data',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
            if (req.url === '/api/upload-resume' && req.method === 'POST') {
              let body = ''
              req.on('data', (chunk) => {
                body += chunk.toString()
              })
              req.on('end', () => {
                try {
                  const { base64Data } = JSON.parse(body)
                  if (!base64Data) {
                    throw new Error('No base64 PDF data provided')
                  }

                  const cleanBase64 = base64Data.replace(/^data:application\/pdf;base64,/, '')
                  const buffer = Buffer.from(cleanBase64, 'base64')

                  const resumePath = path.join(__dirname, 'public', 'resume.pdf')
                  const cvPath = path.join(__dirname, 'public', 'Yashwant CV.pdf')

                  fs.writeFileSync(resumePath, buffer)
                  fs.writeFileSync(cvPath, buffer)

                  console.log(`[API Upload Resume] Updated resume.pdf on disk at: ${resumePath}`)

                  res.statusCode = 200
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: true, message: 'Successfully updated resume.pdf on disk!' }))
                } catch (err: any) {
                  console.error('[API Upload Resume Error]:', err)
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: false, error: err.message }))
                }
              })
            } else if (req.url === '/api/save-data' && req.method === 'POST') {
            let body = ''
            req.on('data', (chunk) => {
              body += chunk.toString()
            })
            req.on('end', () => {
              try {
                const { file, data } = JSON.parse(body)
                const validFiles: Record<string, string> = {
                  personalInfo: 'personalInfo.json',
                  projects: 'projects.json',
                  experience: 'experience.json',
                  tools: 'tools.json',
                  blogPosts: 'blogPosts.json'
                }
                
                const targetFileName = validFiles[file] || (file.endsWith('.json') ? file : `${file}.json`)
                const filePath = path.join(__dirname, 'src', 'data', targetFileName)
                
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
                console.log(`[API Save Data] Saved ${targetFileName} to disk at: ${filePath}`)
                
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true, message: `Successfully saved ${targetFileName} to disk!` }))
              } catch (err: any) {
                console.error('[API Save Data Error]:', err)
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: false, error: err.message }))
              }
            })
          } else {
            next()
          }
        })
      }
    }
  ],
  base: '/'
})
