import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import BlogGallery from '@/src/components/blog/BlogGallery';
import BlogImage from '@/src/components/blog/BlogImage';
import BlogThreeColImg from '@/src/components/blog/BlogThreeColImg';
import BlogTwoColImg from '@/src/components/blog/BlogTwoColImg';
import BlogTitle from '@/src/components/blog/BlogTitle';
import BlogButton from '@/src/components/blog/BlogButton';
import BlogBold from '@/src/components/blog/BlogBold';

const rootDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  locale: string;
  title: string;
  date: string;
  category: string;
  gridImage: string;
  coverImage: string;
  excerpt: string;
}

export async function getBlogPosts(locale: string = 'en'): Promise<BlogPost[]> {
  const localeDir = path.join(rootDirectory, locale);

  // Check if locale directory exists, if not fallback to 'en'
  const finalLocale = fs.existsSync(localeDir) ? locale : 'en';
  const finalDir = fs.existsSync(localeDir)
    ? localeDir
    : path.join(rootDirectory, 'en');

  const files = fs.readdirSync(finalDir);

  const posts = files
    .filter(file => path.extname(file) === '.mdx')
    .map(file => {
      try {
        const filePath = path.join(finalDir, file);
        console.log(`Processing file: ${filePath}`);
        const fileContent = fs.readFileSync(filePath, 'utf8');

        if (!fileContent.trim()) {
          console.error(`Empty or invalid MDX file: ${file}`);
          return null;
        }

        const { data } = matter(fileContent);
        console.log(`Parsed frontmatter for ${file}:`, data);

        if (!data || typeof data !== 'object') {
          console.error(`Invalid frontmatter in MDX file: ${file}`);
          return null;
        }

        const post = {
          slug: path.basename(file, '.mdx'),
          locale: finalLocale,
          title: data.title,
          date: data.date,
          category: data.category,
          gridImage: data.gridImage,
          coverImage: data.coverImage,
          excerpt: data.excerpt
        } as BlogPost;

        console.log(`Successfully processed ${file}:`, post);
        return post;
      } catch (error) {
        console.error(`Error processing MDX file ${file}:`, error);
        return null;
      }
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getBlogPost(locale: string, slug: string) {
  const localeDir = path.join(rootDirectory, locale);

  // Check if locale directory exists, if not fallback to 'en'
  const finalLocale = fs.existsSync(localeDir) ? locale : 'en';
  const finalDir = fs.existsSync(localeDir)
    ? localeDir
    : path.join(rootDirectory, 'en');

  const filePath = path.join(finalDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  return {
    meta: {
      slug,
      locale: finalLocale,
      title: data.title,
      date: data.date,
      category: data.category,
      coverImage: data.coverImage,
      gridImage: data.gridImage,
      excerpt: data.excerpt
    } as BlogPost,
    content: await MDXRemote({
      source: content,
      components: {
        BlogGallery,
        BlogImage,
        BlogTitle,
        BlogThreeColImg,
        BlogTwoColImg,
        BlogButton,
        BlogBold
      }
    })
  };
}
