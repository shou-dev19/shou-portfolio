'use client';
import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Rating } from '@mui/material';
import { motion } from 'framer-motion';
import skillsData from '../../../_contents/skills.json';

interface Skill {
  name: string;
  level?: number;
  years?: number;
  date?: string;
  featured?: boolean;
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

const SkillsSection: React.FC = () => {
  const skills: SkillCategory[] = skillsData;
  const qualifications = skills.find(({ category }) => category === '資格')?.skills ?? [];
  const featuredSkills = skills.flatMap(({ skills: categorySkills }) =>
    categorySkills.filter(({ featured }) => featured),
  );
  const otherSkillCategories = skills
    .filter(({ category }) => category !== '資格')
    .map((category) => ({
      ...category,
      skills: category.skills.filter(({ featured }) => !featured),
    }))
    .filter(({ skills: categorySkills }) => categorySkills.length > 0);

  return (
    <Box sx={{ py: 4, px: { xs: 2, md: 8 } }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, color: 'white' }}>
        Skills
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2, color: 'white' }}>
        資格・認定
      </Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {qualifications.map((qualification) => (
          <Grid item xs={12} sm={6} md={3} key={qualification.name}>
            <motion.div whileHover={{ y: -6 }} style={{ height: '100%' }}>
              <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
                <CardContent
                  sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%', boxSizing: 'border-box' }}
                >
                  <Typography variant="body1" component="h3" sx={{ fontWeight: 500, flexGrow: 1 }}>
                    {qualification.name}
                  </Typography>
                  {qualification.date && <Chip label={qualification.date} size="small" sx={{ alignSelf: 'flex-start' }} />}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2, color: 'white' }}>
        主力スキル
      </Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {featuredSkills.map((skill) => (
          <Grid item xs={12} sm={6} md={4} key={skill.name}>
            <motion.div whileHover={{ y: -8 }} style={{ height: '100%' }}>
              <Card sx={{ height: '100%', borderRadius: 2, boxShadow: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 700, lineHeight: 1.4 }}>
                      {skill.name}
                    </Typography>
                    {skill.years !== undefined && <Chip label={`${skill.years}年`} size="small" />}
                  </Box>
                  {skill.level !== undefined && (
                    <Rating name={`featured-${skill.name}`} value={skill.level} readOnly max={5} size="large" />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mb: 5, borderRadius: 2, boxShadow: 3 }}>
        <CardContent sx={{ py: 2, '&:last-child': { pb: 2 } }}>
          <Typography variant="subtitle1" component="h2" sx={{ mb: 1, fontWeight: 500 }}>
            スキルレベルの凡例
          </Typography>
          {Object.entries(levelDescription).map(([level, desc]) => (
            <Box key={level} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Rating name={`level-${level}`} value={Number(level)} readOnly max={5} size="small" />
              <Typography variant="caption">: {desc}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2, color: 'white' }}>
        その他のスキル
      </Typography>

      <Grid container spacing={4}>
        {otherSkillCategories.map((category) => (
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1" component="div">
                            {skill.name}
                          </Typography>
                          {skill.years !== undefined && <Chip label={`${skill.years}年`} size="small" />}
                        </Box>
                        {skill.level !== undefined && <Rating name={skill.name} value={skill.level} readOnly max={5} />}
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

export default SkillsSection;
