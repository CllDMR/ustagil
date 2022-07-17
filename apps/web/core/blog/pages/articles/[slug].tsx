import { allArticles, type Article } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';

const ArticlePage: FC<{ article: Article }> = ({ article }) => (
  <>
    <Head>
      <title>{article.title}</title>
    </Head>
    <main className="container mx-auto">
      <article className="py-16 prose lg:prose-lg max-w-none">
        <Link href="/">
          <a className="text-sm font-bold text-blue-700 uppercase">Home</a>
        </Link>
        <div className="mb-6 text-center">
          <h1 className="mb-1">{article.title}</h1>
          <time dateTime={article.date} className="">
            {format(parseISO(article.date), 'LLLL d, yyyy')}
          </time>
        </div>
        <div
          className="cl-article-body"
          dangerouslySetInnerHTML={{ __html: article.body.html }}
        />
      </article>
    </main>
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allArticles.map((article) => article.url);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const article =
    allArticles.find(
      (article) => article._raw.flattenedPath === 'articles/' + params.slug
    ) ?? null;
  return {
    props: {
      article,
    },
  };
};

export default ArticlePage;
