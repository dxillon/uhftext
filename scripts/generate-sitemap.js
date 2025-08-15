import { writeFile } from 'node:fs/promises';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import { featuredProjects, upcomingProjects } from './src/data/home.js';
import { articles } from './src/data/articles.js';
import { courses } from './src/types/course.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = 'https://uhfilms.in';
const outputPath = path.resolve(__dirname, '../dist/sitemap.xml');

const staticRoutes = [
  '/', '/team', '/about', '/careers', '/contact', '/careers/apply',
  '/team/apply', '/privacy', '/cookies', '/terms', '/refund-policy',
  '/shipping-policy', '/policies', '/cancellation-policy', '/articles',
  '/journey', '/bishan', '/faq', '/courses', '/projects', '/get-noticed',
  '/casting', '/blogs', '/about-us', '/internships-uhfilms', '/jobs',
  '/bishanpreet-journey', '/ask-us', '/watch'
];

const projectRoutes = [
  ...featuredProjects.map(p => `/project/${p.id}`),
  ...upcomingProjects.map(p => `/project/${p.id}`)
];
const articleRoutes = articles.map(a => `/articles/${a.slug}`);
const courseRoutes = courses.map(c => `/course/${c.slug}`);

const allRoutes = [...staticRoutes, ...projectRoutes, ...articleRoutes, ...courseRoutes];

function escapeXml(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(route => `  <url>
    <loc>${escapeXml(`${hostname}${route}`)}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`)
  .join('\n')}
</urlset>`;

await writeFile(outputPath, sitemap, 'utf-8');
// console.log(`✅ Sitemap generated with ${allRoutes.length} routes at ${outputPath}`);
