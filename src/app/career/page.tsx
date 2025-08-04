import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import CareerClient from '../../components/CareerClient';

const careerDirectory = path.join(process.cwd(), '_contents/career');

async function getCareerData() {
  const fileNames = fs.readdirSync(careerDirectory);
  const allCareerData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(careerDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id,
      ...(matterResult.data as { title: string; period: string; position: string }),
      content: matterResult.content,
    };
  });

  return allCareerData.sort((a, b) => (a.id < b.id ? 1 : -1));
}

const CareerPage = async () => {
  const careerData = await getCareerData();

  return <CareerClient careerData={careerData} />;
};

export default CareerPage;