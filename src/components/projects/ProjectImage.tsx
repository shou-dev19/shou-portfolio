import { Box, ButtonBase, Typography } from '@mui/material';
import { ZoomIn } from '@mui/icons-material';
import type { ProjectFigure } from './ProjectImageViewer';

interface ProjectImageProps {
  figure: ProjectFigure;
  onOpen: (figure: ProjectFigure) => void;
}

const ProjectImage = ({ figure, onOpen }: ProjectImageProps) => (
  <Box component="figure" sx={{ m: 0, mb: 4 }}>
    <Box component="figcaption" sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline',
      justifyContent: 'space-between', gap: 1, mb: 1.5 }}>
      <Typography component="h3" sx={{ color: '#163550', fontWeight: 700 }}>{figure.title}</Typography>
      <Typography variant="caption" sx={{ color: '#536b81' }}>クリック・タップで拡大</Typography>
    </Box>
    <ButtonBase onClick={() => onOpen(figure)} aria-label={`${figure.title}を拡大表示`}
      sx={{ width: '100%', display: 'block', overflow: 'hidden', borderRadius: 2,
        border: '1px solid #ccd8e5', bgcolor: 'white', textAlign: 'left', cursor: 'zoom-in',
        '&:hover': { boxShadow: '0 8px 28px #18345420' },
        '&.Mui-focusVisible': { outline: '3px solid #0284c7', outlineOffset: 4 } }}>
      <Box component="img" src={figure.src} alt={figure.title}
        sx={{ width: '100%', height: 'auto', maxHeight: 640, objectFit: 'contain', display: 'block' }} />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1,
        py: 1.25, color: '#075985', bgcolor: '#eef6fb', borderTop: '1px solid #dce4ed', fontSize: '0.875rem', fontWeight: 600 }}>
        <ZoomIn fontSize="small" /> 拡大して見る
      </Box>
    </ButtonBase>
  </Box>
);

export default ProjectImage;
