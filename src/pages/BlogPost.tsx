import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageWrapper from '../components/PageWrapper'
import { blogPosts } from '../content'
import { palette } from '../theme'

const contentStyle: React.CSSProperties = {
    maxWidth: 720,
    margin: '0 auto'
}

const backButtonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 20px',
    borderRadius: 999,
    border: '1px solid rgba(0,0,0,0.1)',
    background: '#fff',
    color: palette.text,
    fontSize: 14,
    cursor: 'pointer',
    marginBottom: 32,
    transition: 'all 0.3s ease'
}

const metaStyle: React.CSSProperties = {
    display: 'flex',
    gap: 16,
    fontSize: 14,
    color: 'rgba(0,0,0,0.5)',
    marginBottom: 24
}

const articleStyle: React.CSSProperties = {
    fontSize: 17,
    lineHeight: 1.8,
    color: 'rgba(0,0,0,0.8)'
}

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>()
    const navigate = useNavigate()

    const post = blogPosts.find(p => p.slug === slug)

    if (!post) {
        return (
            <PageWrapper title="Post Not Found" sectionId="blog-post">
                <div style={contentStyle}>
                    <p>The blog post you're looking for doesn't exist.</p>
                    <button
                        style={backButtonStyle}
                        onClick={() => navigate('/thoughts')}
                    >
                        ← Back to Blog
                    </button>
                </div>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper title={post.title} sectionId="blog-post">
            <motion.div
                style={contentStyle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <button
                    style={backButtonStyle}
                    onClick={() => navigate('/thoughts')}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#000'
                        e.currentTarget.style.color = '#fff'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff'
                        e.currentTarget.style.color = palette.text
                    }}
                >
                    ← Back to Blog
                </button>

                <div style={metaStyle}>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.read} read</span>
                </div>

                <article
                    style={articleStyle}
                    dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
                />
            </motion.div>
        </PageWrapper>
    )
}

export default BlogPost
