import { useEffect, useState } from 'react';
import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import { Close, OpenInNew, ZoomIn, ZoomOut } from '@mui/icons-material';

export interface ProjectFigure {
  src: string;
  title: string;
}

interface ProjectImageViewerProps {
  figure: ProjectFigure;
  onClose: () => void;
}

const ProjectImageViewer = ({ figure, onClose }: ProjectImageViewerProps) => {
  const [viewportElement, setViewportElement] = useState<HTMLDivElement | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [natural, setNatural] = useState({ width: 0, height: 0 });
  const [zoom, setZoom] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const fit = natural.width && viewport.width
    ? Math.min(Math.max(1, viewport.width - 48) / natural.width, Math.max(1, viewport.height - 48) / natural.height, 1)
    : 1;
  const scale = zoom ?? fit;

  useEffect(() => {
    if (!viewportElement) return;
    const observer = new ResizeObserver(([entry]) => {
      setViewport({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(viewportElement);
    return () => observer.disconnect();
  }, [viewportElement]);

  const resetZoom = () => {
    setZoom(null);
    viewportElement?.scrollTo(0, 0);
  };

  return (
    <Dialog open fullScreen hideBackdrop onClose={onClose} aria-labelledby="project-image-title"
      aria-describedby="project-image-help" PaperProps={{ sx: { bgcolor: '#091321', color: 'white' } }}>
      <Box sx={{ px: { xs: 2, sm: 3 }, pt: 1.5, pb: 1, flexShrink: 0, borderBottom: '1px solid #34465c' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Typography id="project-image-title" component="h2" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, fontWeight: 700 }}>
            {figure.title}
          </Typography>
          <IconButton autoFocus aria-label="画像を閉じて詳細に戻る" onClick={onClose} sx={{ color: 'white', width: 44, height: 44 }}>
            <Close />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, mt: 0.5,
          '& button, & a': { color: '#dcefff', minHeight: 44 }, '& button.Mui-disabled': { color: '#687c91' } }}>
          <IconButton aria-label="画像を縮小" disabled={failed || !natural.width || scale <= fit} onClick={() => setZoom(Math.max(fit, scale / 1.5))}>
            <ZoomOut />
          </IconButton>
          <Typography aria-live="polite" sx={{ width: 50, textAlign: 'center', fontSize: '0.875rem', fontVariantNumeric: 'tabular-nums' }}>
            {Math.round(scale * 100)}%
          </Typography>
          <IconButton aria-label="画像を拡大" disabled={failed || !natural.width || scale >= 3} onClick={() => setZoom(Math.min(3, scale * 1.5))}>
            <ZoomIn />
          </IconButton>
          <Button onClick={resetZoom} disabled={failed}>全体表示</Button>
          <Button onClick={() => setZoom(1)} disabled={failed || !natural.width}>原寸</Button>
          <Button component="a" href={figure.src} target="_blank" rel="noopener noreferrer" endIcon={<OpenInNew fontSize="small" />}
            sx={{ ml: { sm: 'auto' } }}>元画像</Button>
        </Box>
        <Typography id="project-image-help" variant="caption" sx={{ display: 'block', color: '#b8c9d9', mt: 0.5, mb: 0.5 }}>
          拡大後は縦・横にスクロールして細部を確認できます。
        </Typography>
      </Box>
      <Box ref={setViewportElement} role="region" aria-label="拡大画像のスクロール領域" tabIndex={0}
        sx={{ flex: 1, minHeight: 0, overflow: 'auto', overscrollBehavior: 'contain',
          '&:focus-visible': { outline: '2px solid #7dd3fc', outlineOffset: -3 } }}>
        {failed ? <Typography role="status" sx={{ p: 4 }}>画像を読み込めませんでした。「元画像」からも確認できます。</Typography> : (
          <Box sx={{ display: 'flex', p: 3, boxSizing: 'border-box',
            width: Math.max(viewport.width, natural.width * scale + 48),
            minHeight: Math.max(viewport.height, natural.height * scale + 48) }}>
            <Box component="img" src={figure.src} alt={figure.title} draggable={false}
              onLoad={(event) => setNatural({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })}
              onError={() => setFailed(true)}
              sx={{ display: 'block', m: 'auto', flexShrink: 0, width: natural.width ? natural.width * scale : '100%',
                height: natural.height ? natural.height * scale : 'auto', maxWidth: 'none' }} />
          </Box>
        )}
      </Box>
    </Dialog>
  );
};

export default ProjectImageViewer;
