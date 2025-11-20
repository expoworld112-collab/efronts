import { allblogs } from '../actions/blog'
import { DOMAIN } from "../config"

const generateXmlSitemap = (blogs) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${DOMAIN}</loc>
      <priority>1.0</priority>
      <changefreq>daily</changefreq>
    </url>`;

  blogs.forEach((blog) => {
    xml += `
    <url>
      <loc>${`${DOMAIN}/${blog.slug}`}</loc>
      <lastmod>${blog.date}</lastmod>
      <priority>0.8</priority>
      <changefreq>monthly</changefreq>
    </url>`;
  });

  xml += '</urlset>';
  return xml;
};

const Sitemap = () => null;

export async function getServerSideProps({ res }) {
  const blogs = await allblogs();
  res.setHeader('Content-Type', 'text/xml');
  res.write(generateXmlSitemap(blogs));
  res.end();

  return { props: {} };
}

export default Sitemap;
