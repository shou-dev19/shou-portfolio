import { Box } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ProjectMarkdown = ({ content }: { content: string }) => (
  <Box sx={{ color: '#2e4358', fontSize: { xs: '0.95rem', sm: '1rem' }, lineHeight: 1.95, overflowWrap: 'anywhere',
    '& h1, & h2': { color: '#102a46', fontSize: { xs: '1.3rem', sm: '1.55rem' }, lineHeight: 1.6,
      mt: 5, mb: 2, pb: 1.5, borderBottom: '1px solid #cbd9e5' },
    '& > :first-child': { mt: 0 },
    '& h3': { color: '#123e60', fontSize: { xs: '1.1rem', sm: '1.2rem' }, lineHeight: 1.75,
      mt: 4, mb: 1.5, pl: 2, borderLeft: '3px solid #0284c7' },
    '& h4, & h5, & h6': { color: '#163550', fontSize: '1rem', mt: 3, mb: 1 },
    '& p': { mt: 0, mb: 2 }, '& strong': { color: '#163550', fontWeight: 700 },
    '& ul, & ol': { pl: 2.75, my: 2 }, '& li': { pl: 0.5, mb: 1.25 }, '& li::marker': { color: '#0284c7' },
    '& a': { color: '#0369a1', textUnderlineOffset: '3px' },
    '& code': { bgcolor: '#e8eff5', px: 0.5, borderRadius: 0.5, fontSize: '0.88em' },
    '& pre': { overflowX: 'auto', p: 2.5, borderRadius: 2, bgcolor: '#13263b', color: '#e3effb', lineHeight: 1.7 },
    '& pre code': { bgcolor: 'transparent', p: 0, color: 'inherit' },
    '& blockquote': { m: 0, my: 3, px: 3, py: 2, borderLeft: '3px solid #7db9d6', bgcolor: '#edf4f9' },
    '& blockquote p:last-child': { mb: 0 }, '& img': { maxWidth: '100%', height: 'auto' },
    '& table': { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' },
    '& th, & td': { border: '1px solid #cbd9e5', px: 2, py: 1.25, textAlign: 'left', minWidth: 120 },
    '& th': { bgcolor: '#e9f1f7', color: '#163550' },
  }}>
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
      a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
      table: ({ node, ...props }) => <Box role="region" aria-label="プロジェクトの表" tabIndex={0} sx={{ overflowX: 'auto', my: 3 }}><table {...props} /></Box>,
    }}>{content}</ReactMarkdown>
  </Box>
);

export default ProjectMarkdown;
