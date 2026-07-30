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
          if (req.url === '/api/save-data' && req.method === 'POST') {
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
