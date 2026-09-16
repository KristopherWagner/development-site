import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const DOMAIN = 'https://kwagner.dev';

function extractRoutes() {
  const filePath = resolve('./src/routeTree.gen.ts');
  const fileContent = readFileSync(filePath, 'utf-8');

  const pathRegex = /(?:path|fullPath):\s*['"]([^'"]+)['"]/g;
  const routes = new Set(['/']);

  let match;
  while ((match = pathRegex.exec(fileContent)) !== null) {
    let route = match[1];

    if (route && !route.includes('$') && !route.includes('*')) {
      // Ensure leading slash
      if (!route.startsWith('/')) {
        route = `/${route}`;
      }

      // Strip trailing slash (unless it's the root '/')
      if (route.length > 1 && route.endsWith('/')) {
        route = route.slice(0, -1);
      }

      routes.add(route);
    }
  }

  return Array.from(routes);
}

const routes = extractRoutes();
const date = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (path) => `  <url>
    <loc>${DOMAIN}${path}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '/' ? '1.0' : '0.8'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

writeFileSync(resolve('./public/sitemap.xml'), xml, 'utf-8');
console.log(
  `✅ Generated public/sitemap.xml with ${routes.length} unique routes.`,
);
