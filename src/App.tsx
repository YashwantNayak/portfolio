import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Tools from './pages/Tools'
import Thoughts from './pages/Thoughts'
import Contact from './pages/Contact'

const HomeFeed: React.FC = () => (
  <>
    <Home />
    <Projects />
    <Experience />
    <Tools />
  </>
)

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout><HomeFeed /></Layout>} />
      <Route path="/thoughts" element={<Layout><Thoughts /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="*" element={<Layout><HomeFeed /></Layout>} />
    </Routes>
  </BrowserRouter>
)

export default App
