import { FlexibleSection } from './types'

export const mockHomepageSections: FlexibleSection[] = [
  {
    acf_fc_layout: 'hero',
    style: 'split',
    title: 'Build faster with headless WordPress',
    subtitle: 'A modern Next.js starter for headless WordPress development. Pre-built components, ACF support, and full TypeScript.',
    image: {
      ID: 1,
      url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
      alt: 'Developer workspace',
      width: 800,
      height: 600,
      sizes: {},
    },
    primary_button: { title: 'Get Started', url: '/contact', target: '' },
    secondary_button: { title: 'View Docs', url: '/docs', target: '' },
  },
  {
    acf_fc_layout: 'logos',
    heading: 'Trusted by developers worldwide',
    logos: [
      { ID: 2, url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', alt: 'Next.js', width: 120, height: 40, sizes: {} },
      { ID: 3, url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg', alt: 'WordPress', width: 120, height: 40, sizes: {} },
      { ID: 4, url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', alt: 'TypeScript', width: 120, height: 40, sizes: {} },
      { ID: 5, url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', alt: 'Tailwind', width: 120, height: 40, sizes: {} },
      { ID: 6, url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', alt: 'React', width: 120, height: 40, sizes: {} },
    ],
  },
  {
    acf_fc_layout: 'features',
    heading: 'Everything you need',
    subheading: 'A complete toolkit for building headless WordPress sites with modern frontend technology.',
    columns: 3,
    features: [
      {
        icon: '⚡',
        title: 'Lightning Fast',
        description: 'Static generation and ISR for blazing fast page loads. Your content is pre-rendered at build time.',
      },
      {
        icon: '🎨',
        title: 'Flexible Styling',
        description: 'Tailwind CSS with theme.json integration. Share design tokens between WordPress and Next.js.',
      },
      {
        icon: '📱',
        title: 'Fully Responsive',
        description: 'Mobile-first components that look great on any device. Built with accessibility in mind.',
      },
      {
        icon: '🔌',
        title: 'Plugin Support',
        description: 'Works with Yoast SEO, ACF Pro, Contact Form 7, WPML, and more out of the box.',
      },
      {
        icon: '🛠️',
        title: 'Developer Experience',
        description: 'TypeScript, ESLint, and Prettier configured. Hot reload and fast refresh included.',
      },
      {
        icon: '📦',
        title: 'Pre-built Components',
        description: 'Heroes, sliders, forms, and flexible content sections ready to use.',
      },
    ],
  },
  {
    acf_fc_layout: 'image_text',
    heading: 'Content management made simple',
    content: '<p>Use the familiar WordPress admin to manage your content while delivering a modern, fast frontend experience to your users.</p><p>ACF Flexible Content lets you build dynamic pages with pre-designed sections. No coding required for content editors.</p>',
    image: {
      ID: 7,
      url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
      alt: 'Content management',
      width: 800,
      height: 600,
      sizes: {},
    },
    button: { title: 'Learn More', url: '/about', target: '' },
    reversed: false,
  },
  {
    acf_fc_layout: 'stats',
    heading: 'Built for performance',
    style: 'dark',
    stats: [
      { value: '100', label: 'Lighthouse Score' },
      { value: '< 1s', label: 'First Paint' },
      { value: '50+', label: 'Components' },
      { value: '0', label: 'Runtime JS (SSG)' },
    ],
  },
  {
    acf_fc_layout: 'image_text',
    heading: 'Seamless WordPress integration',
    content: '<p>Full REST API integration with support for posts, pages, categories, menus, and custom fields.</p><p>Automatic SEO meta tags from Yoast, dynamic navigation from WordPress menus, and real-time form submissions with Contact Form 7.</p>',
    image: {
      ID: 8,
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      alt: 'WordPress integration',
      width: 800,
      height: 600,
      sizes: {},
    },
    button: { title: 'View Features', url: '/features', target: '' },
    reversed: true,
  },
  {
    acf_fc_layout: 'testimonials',
    heading: 'What developers say',
    testimonials: [
      {
        quote: 'This starter saved me weeks of setup time. The ACF integration is exactly what I needed for client projects.',
        name: 'Sarah Chen',
        role: 'Senior Developer',
        company: 'TechCorp',
        image: { ID: 9, url: 'https://i.pravatar.cc/150?img=1', alt: 'Sarah Chen', width: 150, height: 150, sizes: {} },
      },
      {
        quote: 'Finally, a headless WordPress setup that actually works well with TypeScript. The DX is fantastic.',
        name: 'Marcus Johnson',
        role: 'Tech Lead',
        company: 'StartupXYZ',
        image: { ID: 10, url: 'https://i.pravatar.cc/150?img=3', alt: 'Marcus Johnson', width: 150, height: 150, sizes: {} },
      },
      {
        quote: 'The theme.json integration means our designers can update colors in WordPress and it just works in Next.js.',
        name: 'Emily Rodriguez',
        role: 'Frontend Engineer',
        company: 'DesignStudio',
        image: { ID: 11, url: 'https://i.pravatar.cc/150?img=5', alt: 'Emily Rodriguez', width: 150, height: 150, sizes: {} },
      },
    ],
  },
  {
    acf_fc_layout: 'faq',
    heading: 'Frequently asked questions',
    items: [
      {
        question: 'Do I need ACF Pro?',
        answer: 'ACF Pro is recommended for Flexible Content fields, but the starter works with basic ACF or no ACF at all. Custom fields are optional.',
      },
      {
        question: 'Can I use this with any WordPress theme?',
        answer: 'Yes! This is a headless setup, so the WordPress theme doesn\'t affect the frontend. We recommend our wpbaseline theme for optimal REST API support.',
      },
      {
        question: 'How do I deploy this?',
        answer: 'Deploy to Vercel, Netlify, or any platform that supports Next.js. Set your WordPress URL in environment variables and you\'re ready to go.',
      },
      {
        question: 'Is this SEO friendly?',
        answer: 'Absolutely. Pages are statically generated with full meta tags from Yoast SEO. You get the best of both worlds: WordPress SEO tools and blazing fast static pages.',
      },
    ],
  },
  {
    acf_fc_layout: 'gallery',
    heading: 'Built with modern tools',
    columns: 4,
    images: [
      { ID: 12, url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop', alt: 'Code editor', width: 400, height: 400, sizes: {} },
      { ID: 13, url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=400&fit=crop', alt: 'Laptop coding', width: 400, height: 400, sizes: {} },
      { ID: 14, url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop', alt: 'Developer desk', width: 400, height: 400, sizes: {} },
      { ID: 15, url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop', alt: 'Programming', width: 400, height: 400, sizes: {} },
    ],
  },
  {
    acf_fc_layout: 'cta',
    title: 'Ready to get started?',
    description: 'Clone the repo, configure your WordPress URL, and start building. It\'s that simple.',
    button: { title: 'View on GitHub', url: 'https://github.com', target: '_blank' },
    style: 'primary',
  },
]

export const mockSiteInfo = {
  name: 'starter',
  description: 'headless wordpress + next.js',
  logo: null,
}

export const mockMainMenu = [
  { id: 1, title: 'Home', url: '/', target: '' },
  { id: 2, title: 'Blog', url: '/posts', target: '' },
  { id: 3, title: 'About', url: '/pages/about', target: '' },
  { id: 4, title: 'Contact', url: '/contact', target: '' },
]

export const mockFooterMenu = [
  { id: 5, title: 'Documentation', url: '/docs', target: '' },
  { id: 6, title: 'Components', url: '/components', target: '' },
  { id: 7, title: 'GitHub', url: 'https://github.com', target: '_blank' },
]

export const mockPages = [
  { slug: 'about', title: 'About' },
]

export const mockPosts = [
  {
    id: 1,
    slug: 'getting-started-with-headless-wordpress',
    title: { rendered: 'Getting Started with Headless WordPress' },
    excerpt: { rendered: '<p>Learn how to set up a headless WordPress site with Next.js for blazing fast performance.</p>' },
    content: { rendered: '<p>This is a sample post content. Replace with your actual WordPress content.</p>' },
    date: '2024-01-15',
    categories: [1],
  },
  {
    id: 2,
    slug: 'tailwind-css-best-practices',
    title: { rendered: 'Tailwind CSS Best Practices' },
    excerpt: { rendered: '<p>Discover the best practices for writing clean and maintainable Tailwind CSS.</p>' },
    content: { rendered: '<p>This is a sample post content. Replace with your actual WordPress content.</p>' },
    date: '2024-01-10',
    categories: [2],
  },
  {
    id: 3,
    slug: 'nextjs-15-new-features',
    title: { rendered: 'Next.js 15 New Features' },
    excerpt: { rendered: '<p>Explore the exciting new features in Next.js 15 including improved performance.</p>' },
    content: { rendered: '<p>This is a sample post content. Replace with your actual WordPress content.</p>' },
    date: '2024-01-05',
    categories: [1],
  },
]

export const mockCategories = [
  { id: 1, name: 'Development', slug: 'development', count: 2 },
  { id: 2, name: 'Design', slug: 'design', count: 1 },
]
