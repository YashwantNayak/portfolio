export const personalInfo = {
  name: 'Yashwant Nayak',
  title: 'Software Engineer',
  bio: 'I work as a Software Engineer, but my skillset goes way beyond just one domain. I\'m also a Data Analyst, a Full-Stack Web & App Developer, and a UI/UX Designer who enjoys crafting clean interfaces and smooth user experiences.',
  email: 'yashwant@example.com',
  location: 'Raipur, India',
  resumeUrl: '/resume.pdf'
}

export const socialLinks = {
  github: 'https://github.com/yashwantnayak',
  linkedin: 'https://linkedin.com/in/yashwantnayak',
  twitter: 'https://twitter.com/yashwantnayak',
  email: 'mailto:yashwant@example.com'
}

export const stats = [
  { label: 'Years Experience', value: '3+' },
  { label: 'Projects', value: '25+' },
  { label: 'Technologies', value: '15+' }
]

export const projects = [
  {
    id: 'mis-local-bodies',
    title: 'MIS Local Bodies Platform',
    shortDesc: 'Comprehensive MIS platform with cookie-less authentication and analytics dashboards.',
    description: `Developed a comprehensive Management Information System for local government bodies with advanced features including Google and Facebook login integration, file management, and real-time analytics dashboards. The platform handles time-based data uploads and event management with a focus on performance and security.`,
    tags: ['React', 'Node.js', 'MongoDB', 'Analytics'],
    role: 'Full Stack Developer',
    year: '2024',
    images: ['/projects/green_poster.png', '/projects/mis-2.jpg'],
    links: {
      live: 'https://example.com',
      repo: 'https://github.com/example'
    },
    accent: ['#93c2f9ff', '#e0e7ff'],
    highlights: [
      'Implemented cookie-less authentication system',
      'Built real-time analytics dashboards',
      'Integrated Google and Facebook OAuth',
      'Developed CRUD operations with file management',
      'Ensured cross-browser compatibility and responsiveness'
    ]
  },
  {
    id: 'bharat-plus-admin',
    title: 'Bharat Plus Admin Portal',
    shortDesc: 'Admin portal for e-commerce app with payment integration and item filtering.',
    description: `Designed and developed a comprehensive admin portal for the Bharat Plus mobile application. Implemented secure payment workflows, advanced item filtering, and user management features with a focus on intuitive UI/UX.`,
    tags: ['React', 'TypeScript', 'UI/UX', 'Payment'],
    role: 'Frontend Developer',
    year: '2023',
    images: ['/projects/bharat-1.jpg'],
    links: {
      live: 'https://example.com'
    },
    accent: ['#fff9f0', '#fef3c7'],
    highlights: [
      'Developed secure payment action workflows',
      'Implemented advanced item filtering system',
      'Created intuitive admin interface',
      'Collaborated with backend team for API integration'
    ]
  },
  {
    id: 'educational-platform',
    title: 'Educational Web Application',
    shortDesc: 'E-learning platform with interactive features and seamless functionality.',
    description: `Built a full-featured educational web application using the MERN stack. Designed API structure and implemented interactive learning modules with focus on user engagement and performance.`,
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    role: 'MERN Stack Developer',
    year: '2023',
    images: ['/projects/edu-1.jpg'],
    links: {
      repo: 'https://github.com/example'
    },
    accent: ['#f7fff5', '#dcfce7'],
    highlights: [
      'Designed RESTful API architecture',
      'Implemented interactive learning modules',
      'Built user authentication and authorization',
      'Optimized database queries for performance'
    ]
  },
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio',
    shortDesc: 'Modern portfolio with motion-first design and cinematic interactions.',
    description: `A cinematic portfolio website with motion-first storytelling, built with React and Framer Motion. Features smooth animations, responsive design, and an elegant dark-light theme combination.`,
    tags: ['React', 'Framer Motion', 'UI/UX'],
    role: 'Designer & Developer',
    year: '2025',
    images: ['/projects/portfolio-1.jpg'],
    links: {
      live: 'https://example.com',
      repo: 'https://github.com/example'
    },
    accent: ['#fdf3ff', '#f5e6ff'],
    highlights: [
      'Implemented smooth scroll animations',
      'Created custom typing animation component',
      'Designed glassmorphic navigation',
      'Built responsive layout system'
    ]
  },
  {
    id: 'task-management-app',
    title: 'Task Management System',
    shortDesc: 'Real-time collaborative task manager with team features and notifications.',
    description: `Developed a real-time task management application with collaborative features, drag-and-drop interface, and instant notifications. Built with React, Socket.io, and Firebase for real-time updates.`,
    tags: ['React', 'Socket.io', 'Firebase', 'Real-time'],
    role: 'Full Stack Developer',
    year: '2024',
    images: ['/projects/task-1.jpg'],
    links: {
      live: 'https://example.com',
      repo: 'https://github.com/example'
    },
    accent: ['#fff0f5', '#ffe4e6'],
    highlights: [
      'Implemented real-time collaboration features',
      'Built drag-and-drop task interface',
      'Integrated push notifications',
      'Designed team management system'
    ]
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Analytics Dashboard',
    shortDesc: 'Interactive weather dashboard with forecasts and data visualizations.',
    description: `Created an interactive weather analytics dashboard using React and Chart.js. Features include real-time weather data, 7-day forecasts, and beautiful data visualizations with location-based services.`,
    tags: ['React', 'Chart.js', 'API', 'Data Viz'],
    role: 'Frontend Developer',
    year: '2024',
    images: ['/projects/weather-1.jpg'],
    links: {
      live: 'https://example.com',
      repo: 'https://github.com/example'
    },
    accent: ['#f0f9ff', '#e0f2fe'],
    highlights: [
      'Integrated weather API services',
      'Built interactive data visualizations',
      'Implemented geolocation features',
      'Designed responsive dashboard layout'
    ]
  },
  {
    id: 'social-media-app',
    title: 'Social Connect Platform',
    shortDesc: 'Social networking app with posts, stories, and real-time messaging.',
    description: `Built a full-featured social media platform with user profiles, posts, stories, and real-time messaging. Implemented image uploads, likes, comments, and follow system using MERN stack.`,
    tags: ['React', 'Node.js', 'MongoDB', 'WebSocket'],
    role: 'Full Stack Developer',
    year: '2023',
    images: ['/projects/social-1.jpg'],
    links: {
      repo: 'https://github.com/example'
    },
    accent: ['#fef3f2', '#fee2e2'],
    highlights: [
      'Built real-time messaging system',
      'Implemented image upload and processing',
      'Created social interaction features',
      'Designed user profile system'
    ]
  },
  {
    id: 'fitness-tracker',
    title: 'Fitness Tracking App',
    shortDesc: 'Comprehensive fitness tracker with workout plans and progress analytics.',
    description: `Developed a comprehensive fitness tracking application with workout plans, exercise library, progress tracking, and nutrition logging. Features include custom workout builder and detailed analytics.`,
    tags: ['React Native', 'Firebase', 'Analytics'],
    role: 'Mobile Developer',
    year: '2024',
    images: ['/projects/fitness-1.jpg'],
    links: {
      live: 'https://example.com'
    },
    accent: ['#f0fdf4', '#dcfce7'],
    highlights: [
      'Built workout planning system',
      'Implemented progress tracking',
      'Created exercise library',
      'Designed nutrition logging features'
    ]
  }
]

export const experience = [
  {
    company: 'Cybrom Technology',
    role: 'Python Developer',
    date: 'Feb 2025 — Present',
    summary: 'Building efficient backend systems using Python and Flask. Developing mobile applications using UI Path.',
    details: [
      'Building efficient backend systems using Python and Flask',
      'Developing mobile applications using UI Path',
      'Implementing RESTful APIs and microservices',
      'Collaborating with cross-functional teams'
    ]
  },
  {
    company: 'Tatva Global',
    role: 'MIS Local Bodies Developer',
    date: 'Aug 2024 — Jan 2025',
    summary: 'Developed comprehensive MIS platforms with advanced authentication and analytics features.',
    details: [
      'Developed comprehensive MIS platforms with cookie-less features',
      'Implemented Google and Facebook login; file, user authentication',
      'Built CRUD application and integrated data analytics dashboards',
      'Created event pages and time-based data upload functionality',
      'Ensured cross-browser compatibility and performance optimization'
    ]
  },
  {
    company: 'Conative IT Solutions',
    role: 'Full Stack Developer',
    date: 'Jul 2023 — Aug 2024',
    summary: 'Designed UI prototypes and developed admin portals with secure payment workflows.',
    details: [
      'Designed and developed UI designs with fully functional web prototypes',
      'Developed admin portal for Bharat Plus app',
      'Implemented payment and item-filter actions with secure workflows',
      'Collaborated with designers and backend team for API integration',
      'Performed code reviews and deployment'
    ]
  }
]

export const tools = {
 
  frontend: [
    { name: 'React', logo: 'https://cdn.simpleicons.org/react' },
    { name: 'Angular', logo: 'https://cdn.simpleicons.org/angular' },
    { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript' },
    { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript' },
    { name: 'HTML5', logo: 'https://cdn.simpleicons.org/html5' },
    { name: 'CSS3', logo: 'https://imgs.search.brave.com/7D1uAt3FTz7kD6XLJjfeG8dazQcmJ_gJjnPZi4SkmT4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pY29u/LmljZXBhbmVsLmlv/L1RlY2hub2xvZ3kv/c3ZnL0NTUzMuc3Zn' },
    { name: 'Flutter', logo: 'https://cdn.simpleicons.org/flutter' },
    // { name: 'Framer Motion', logo: 'https://cdn.simpleicons.org/framer' },
    // { name: 'Redux', logo: 'https://cdn.simpleicons.org/redux' }
  ],
  backend: [
    { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs' },
    { name: 'Express', logo: 'https://cdn.simpleicons.org/express/000000' },
    { name: 'Python', logo: 'https://cdn.simpleicons.org/python' },
    { name: 'Flask', logo: 'https://cdn.simpleicons.org/flask/000000' },
    { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb' },
    { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql' },
    { name: 'Firebase', logo: 'https://www.svgrepo.com/show/303670/firebase-1-logo.svg' }
  ],
   Programming_languages: [
    { name: 'C', logo: 'https://imgs.search.brave.com/g4qCBV3wmAJK1V-IkpVcx7s33YufA8lTFHY44Jcj-w4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2Q4L0NfTGFuZ3Vh/Z2VfTG9nby5zdmc' },
    { name: 'C++', logo: 'https://cdn.simpleicons.org/cplusplus' },
    { name: 'Java', logo: 'https://www.citypng.com/public/uploads/preview/hd-java-programming-logo-png-701751694771848sm650yaqjt.png' },
    { name: 'Python', logo: 'https://cdn.simpleicons.org/python' },
    { name: 'PHP', logo: 'https://cdn.simpleicons.org/php' },
    { name: 'Dart', logo: 'https://cdn.simpleicons.org/dart' }  
  ],
  tools: [
    { name: 'Git', logo: 'https://cdn.simpleicons.org/git' },
    { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/000000' },
    { name: 'Canva', logo: 'https://cdn.simpleicons.org/canva' },
    { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma' },
    { name: 'VS Code', logo: 'https://logotyp.us/file/vs-code.svg' },
    { name: 'Postman', logo: 'https://cdn.simpleicons.org/postman' },
    { name: 'Docker', logo: 'https://cdn.simpleicons.org/docker' },
    { name: 'Linux', logo: 'https://cdn.simpleicons.org/linux/000000' },
     { name: 'n8n.io', logo: 'https://imgs.search.brave.com/s1iTkjlqH_p7wCqXIUpdwRJoL-vYJwJmfVICFWdToKI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YnJhbmRmZXRjaC5p/by9pZE82XzZ1cUo5/L3cvNjAwL2gvNjAw/L3RoZW1lL2Rhcmsv/aWNvbi5wbmc_Yz0x/YnhpZDY0TXVwN2Fj/emV3U0FZTVgmdD0x/NjY3NjMxMjAzNjY2' }
  ],
  other: [
    { name: 'Problem Solving', logo: 'https://cdn.simpleicons.org/leetcode/FFA116' },
    { name: 'Data Structures', logo: 'https://cdn.simpleicons.org/datadog/632CA6' },
    { name: 'Algorithms', logo: 'https://imgs.search.brave.com/zNirfIGCLTFKGW6xGvj8hh75evqSGur-2yv08yGrq4o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni81NTQwLzU1NDAz/NDcucG5nP3NlbXQ9/YWlzX3doaXRlX2xh/YmVs' },  
    { name: 'System Design', logo: 'https://cdn.simpleicons.org/diagramsdotnet/F08705' },
    { name: 'UI/UX Design', logo: 'https://cdn.simpleicons.org/dribbble' },
    // { name: 'RESTful APIs', logo: 'https://cdn.simpleicons.org/swagger' },
    // { name: 'Responsive Design', logo: 'https://cdn.simpleicons.org/css3/1572B6' },
    { name: 'Version Control', logo: 'https://cdn.simpleicons.org/git' },
    { name: 'npm', logo: 'https://cdn.simpleicons.org/npm' },
    { name: 'Android studio', logo: 'https://cdn.simpleicons.org/androidstudio' },
    { name: 'vs studio', logo: 'https://imgs.search.brave.com/xdK24CgijvddCuiPN_68UqYkccIEMpY9GDe_6_lQ9NQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzA0/L1Zpc3VhbC1TdHVk/aW8tbG9nby01MDB4/MjgxLmpwZw' },
    { name: 'Cloud Computing', logo: 'https://cdn.simpleicons.org/googlecloud/4285F4' }
  ]
}

export const blogPosts = [
  {
    slug: 'designing-atmosphere-in-ui',
    title: 'Designing Atmosphere In UI',
    date: 'Aug 14, 2024',
    read: '4 min',
    excerpt: 'How subtle design choices create emotional connections and memorable user experiences.',
    content: `# Designing Atmosphere In UI

Creating atmosphere in user interfaces goes beyond just aesthetics. It's about crafting an emotional connection between the user and your product.

## The Power of Subtle Details

Small design choices compound to create a cohesive experience:
- Micro-animations that feel natural
- Color palettes that evoke specific emotions
- Typography that sets the right tone
- Spacing that gives content room to breathe

## Motion as a Design Tool

Motion isn't just decoration—it's communication. Every animation should serve a purpose, whether it's providing feedback, guiding attention, or creating delight.

## Conclusion

Atmosphere is the sum of countless small decisions. Pay attention to the details, and your users will feel the difference.`
  },
  {
    slug: 'micro-interactions-b2b',
    title: 'Micro-Interactions In B2B Products',
    date: 'Jun 02, 2024',
    read: '6 min',
    excerpt: 'Why enterprise software deserves the same attention to interaction design as consumer apps.',
    content: `# Micro-Interactions In B2B Products

Enterprise software has a reputation for being boring and clunky. But it doesn't have to be that way.

## Why B2B Needs Better Interactions

Users spend 8+ hours a day in these tools. Small improvements in interaction design can have massive impacts on productivity and satisfaction.

## Examples That Work

- Loading states that inform rather than frustrate
- Keyboard shortcuts that respect power users
- Feedback that confirms actions without being intrusive

## Implementation Tips

Start small. Pick one workflow and make it delightful. Then expand from there.`
  },
  {
    slug: 'scaling-motion-tokens',
    title: 'Scaling Motion Tokens',
    date: 'Mar 19, 2024',
    read: '5 min',
    excerpt: 'Building a systematic approach to animation in design systems.',
    content: `# Scaling Motion Tokens

As design systems grow, motion can become inconsistent. Motion tokens solve this problem.

## What Are Motion Tokens?

Just like color and spacing tokens, motion tokens define reusable animation properties:
- Duration scales
- Easing curves
- Choreography patterns

## Benefits

- Consistency across the product
- Easier collaboration between designers and developers
- Faster implementation of new features

## Getting Started

Define your core durations (fast, medium, slow) and easing curves. Document when to use each one.`
  }
]
