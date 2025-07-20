import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip } from '@mui/material';
import skillsData from '../../../_contents/skills.json';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const SkillsPage: React.FC = () => {
  const skills: SkillCategory[] = skillsData;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Skills
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {skills.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.category}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom align="center">
                  {category.category}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mt: 2 }}>
                  {category.skills.map((skill) => (
                    <Chip label={skill.name} key={skill.name} />
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
