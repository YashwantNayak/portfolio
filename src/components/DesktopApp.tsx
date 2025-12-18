import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import Experience from '../pages/Experience'
import Tools from '../pages/Tools'
import Thoughts from '../pages/Thoughts'
import BlogPost from '../pages/BlogPost'
import Contact from '../pages/Contact'
import ScrollToTop from './ScrollToTop'

const HomeFeed: React.FC = () => (
  <>
    <Home />
    <Projects />
    <Experience />
    <Tools />
  </>
)

const DesktopApp: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Layout><HomeFeed /></Layout>} />
      <Route path="/resume" element={<Layout><Thoughts /></Layout>} />
      <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="*" element={<Layout><HomeFeed /></Layout>} />
    </Routes>
  </BrowserRouter>
)

export default DesktopApp
