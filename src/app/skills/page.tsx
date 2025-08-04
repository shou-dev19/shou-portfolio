import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Rating } from '@mui/material';
import { motion } from 'framer-motion';
import skillsData from '../../../_contents/skills.json';
import { motion } from 'framer-motion';

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
    <Box sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
        Skills
      </Typography>

      <Card sx={{ mb: 4, p: 2, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
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
        </CardContent>
      </Card>

      <Grid container spacing={4}>
        {skills.map((category) => (
          <Grid item xs={12} md={6} key={category.category}>
            <motion.div whileHover={{ y: -10 }}>
              <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
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
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SkillsPage;
