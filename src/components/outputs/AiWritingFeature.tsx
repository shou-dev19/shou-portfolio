import { Box, Typography, Link, Chip } from '@mui/material';
import { ArrowForward, NorthEast } from '@mui/icons-material';

const articles = [
  {
    part: '01 / 考え方を知る',
    title: 'AI駆動開発、用語で挫折していませんか？【前編】',
    description: '歴史をたどりながら、SkillsやHooksのつながりをひもとく。',
    url: 'https://qiita.com/shou-dev19/items/e1583af614a573e4b245',
  },
  {
    part: '02 / 仕組みを理解する',
    title: '「ハーネス」がわかると、AI駆動開発が見えてくる【後編】',
    description: 'AIエージェントを支える仕組みと、開発環境の変化を整理する。',
    url: 'https://qiita.com/shou-dev19/items/0f4ee962b89a322eefc0',
  },
];

const AiWritingFeature = () => (
  <Box sx={{ mb: 5, overflow: 'hidden', borderRadius: 3, border: '1px solid #426082',
    bgcolor: '#0b1c33', color: 'white', display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' } }}>
    <Box sx={{ p: { xs: 2.5, sm: 4, lg: 5 }, background: 'linear-gradient(135deg, #15385b, #0b1c33)' }}>
      <Typography variant="overline" sx={{ color: '#8bd9fa', letterSpacing: '0.16em', fontWeight: 700 }}>
        AI ENGINEERING & WRITING
      </Typography>
      <Typography component="h3" sx={{ mt: 1.5, mb: 2, fontWeight: 700,
        fontSize: { xs: '1.65rem', sm: '2.1rem' }, lineHeight: 1.5, letterSpacing: '-0.03em' }}>
        AIを実践し、<br />知見を共有する。
      </Typography>
      <Typography sx={{ color: '#d1dce9', lineHeight: 1.95, fontSize: '0.95rem', maxWidth: 480 }}>
        AI駆動開発の考え方から、エージェントの設計・運用まで。
        自分で試し、つくり、運用して得た知見を、技術記事として発信しています。
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 3, mb: 3 }}>
        {['AI駆動開発', 'AIエージェント', '自動化・運用'].map((tag) => (
          <Chip key={tag} label={tag} size="small" sx={{ color: '#dceefb', bgcolor: '#233e58', border: '1px solid #456079' }} />
        ))}
      </Box>
      <Link href="#project-yt-factory" sx={{ color: '#8bd9fa', display: 'inline-flex', gap: 1,
        alignItems: 'center', fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.8 }}>
        実践例：yt-factoryを見る <ArrowForward fontSize="small" />
      </Link>
    </Box>
    <Box sx={{ p: { xs: 2.5, sm: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="overline" sx={{ color: '#a8df72', letterSpacing: '0.12em', mb: 1 }}>
        PICKUP / Qiitaで伝えるAIの知見
      </Typography>
      {articles.map((article, index) => (
        <Link key={article.url} href={article.url} target="_blank" rel="noopener noreferrer"
          sx={{ display: 'block', color: 'white', textDecoration: 'none', py: 2.5,
            borderTop: index ? '1px solid #30445c' : undefined,
            '&:hover h4': { color: '#a8df72' }, '&:focus-visible': { outline: '2px solid #8bd9fa', outlineOffset: 4 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, mb: 1 }}>
            <Typography variant="caption" sx={{ color: '#abc0d4', letterSpacing: '0.05em' }}>{article.part}</Typography>
            <NorthEast sx={{ fontSize: 18, color: '#a8df72', flexShrink: 0 }} />
          </Box>
          <Typography component="h4" sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' }, lineHeight: 1.8 }}>
            {article.title}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#b8c9d9', lineHeight: 1.8 }}>{article.description}</Typography>
        </Link>
      ))}
    </Box>
  </Box>
);

export default AiWritingFeature;
