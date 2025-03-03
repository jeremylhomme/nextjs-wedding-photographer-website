import { getBlogPosts } from '@/src/lib/mdx';
import { locales } from '@/src/i18n/routing';

async function generateImageSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml +=
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  // Generate image sitemap entries for all locales
  for (const locale of locales) {
    const blogPosts = await getBlogPosts(locale);

    for (const post of blogPosts) {
      xml += '  <url>\n';
      xml += `    <loc>${baseUrl}/${locale}/blog/${post.slug}</loc>\n`;

      // Add grid image
      if (post.gridImage) {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${baseUrl}${post.gridImage}</image:loc>\n`;
        xml += `      <image:title>${(post.altGridImage || post.title).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>\n`;
        xml += `      <image:caption>${(post.altGridImage || post.title).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:caption>\n`;
        xml += '    </image:image>\n';
      }

      // Add cover image
      if (post.coverImage) {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${baseUrl}${post.coverImage}</image:loc>\n`;
        xml += `      <image:title>${post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:title>\n`;
        xml += `      <image:caption>${post.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</image:caption>\n`;
        xml += '    </image:image>\n';
      }

      xml += '  </url>\n';
    }
  }

  xml += '</urlset>';
  return xml;
}

export async function GET() {
  const body = await generateImageSitemap();
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate'
    }
  });
}
