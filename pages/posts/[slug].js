import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import styled from 'styled-components';

const MarkdownContainer = styled.div`
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 8px 18px;
  h1 {
  font-size: 48px;
  margin: 0 0 8px 0;
  font-weight: 700;
  letter-spacing: -2px;
  background: linear-gradient(
    549deg,
    #4ab1f1 5.71%,
    #566cec 33.77%,
    #d749af 61.82%,
    #ff7c51 91.21%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    font-size: 32px;
  }
}

h2 {
  font-size: 32px
  margin: 0 0 12x 0;
  font-weight: 900;
  letter-spacing: -1px;
  color: ${({ theme }) => theme.text.primary};
  position: relative;
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    font-size: 22px;
  }
}

h3 {
  margin-top: 8px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.text.primary};
  opacity: 0.85;
  text-decoration: underline;
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    font-size: 15px;
    margin-top: 4px;
  }
}

  p {
    margin: 8px 0 8px 0;
  }
  code {
    border-radius: 6px;
    padding: 0.2em 0.4em;
    font-size: 90%;
  }
  pre code {
    display: block;
    padding: 1em;
    overflow-x: auto;
  }
  a {
    color:rgb(142, 244, 78);
    text-decoration: underline;
  }
`;

export async function getStaticPaths() {
    const contentDir = path.join(process.cwd(), 'posts');
    const files = fs.readdirSync(contentDir);
    const paths = files.filter(f => f.endsWith('.md')).map(filename => {
        const slug = filename.replace(/\.md$/, '');
        return { params: { slug } };
    });
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    return {
        props: {
            frontmatter: data,
            content: processedContent.toString(),
            slug,
        },
    };
}

export default function PostPage({ frontmatter, content }) {
    return (
        <div>
            <MarkdownContainer dangerouslySetInnerHTML={{ __html: content }} />
</div>
    );
}
