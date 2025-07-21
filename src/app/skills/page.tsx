import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Rating } from '@mui/material';
import skillsData from '../../../_contents/skills.json';

interface Skill {
  name: string;
  level?: number;
  years?: number;
  date?: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const levelDescription = {
  1: '触れたことがある・学習中',
  2: 'チュートリアルや簡単なアプリケーションなら作れる',
  3: '実務で利用した経験がある（指示があれば対応可能）',
  4: '実務で中心的に利用しており、自走して開発を進められる',
  5: '他のメンバーに指導したり、アーキテクチャ設計ができる',
};

const SkillsPage: React.FC = () => {
  const skills: SkillCategory[] = skillsData;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Skills
      </Typography>

      <Box sx={{ mb: 4, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          スキルレベルの凡例
        </Typography>
        {Object.entries(levelDescription).map(([level, desc]) => (
          <Box key={level} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating name={`level-${level}`} value={Number(level)} readOnly max={5} size="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              : {desc}
            </Typography>
          </Box>
        ))}
      </Box>

      <Grid container spacing={4}>
        {skills.map((category) => (
          <Grid item xs={12} md={6} key={category.category}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom align="center">
                  {category.category}
                </Typography>
                <Box>
                  {category.skills.map((skill) => (
                    <Box key={skill.name} sx={{ mb: 2 }}>
                      {category.category === '資格' ? (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1" component="div">
                            {skill.name}
                          </Typography>
                          {skill.date && <Chip label={skill.date} size="small" />}
                        </Box>
                      ) : (
                        <>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="body1" component="div">
                              {skill.name}
                            </Typography>
                            {skill.years !== undefined && <Chip label={`${skill.years}年`} size="small" />}
                          </Box>
                          {skill.level !== undefined && <Rating name={skill.name} value={skill.level} readOnly max={5} />}
                        </>
                      )}
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SkillsPage;
