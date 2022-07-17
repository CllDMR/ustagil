import { allArticles, type Article } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { FC } from 'react';
import Footer from '../components/PageFooter/Footer';
import Header from '../components/PageHeader/Header';
import Main from '../components/PageMain/Main';

type ArticleCardProps = {
  article: Article;
};

const ArticleCard: FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="mb-6">
      <time dateTime={article.date} className="block text-sm text-slate-600">
        {format(parseISO(article.date), 'LLLL d, yyyy')}
      </time>
      <h2 className="text-lg">
        <Link href={article.url}>
          <a className="text-blue-700 hover:text-blue-900">{article.title}</a>
        </Link>
      </h2>
    </div>
  );
};

type IndexPageProps = {
  articles: Article[];
};

const IndexPage: NextPage<IndexPageProps> = ({ articles }) => (
  <>
    <Head>
      <title>Index Page</title>
    </Head>

    <Header />

    <Main>
      {articles.map((article, idx) => (
        <ArticleCard key={idx} article={article} />
      ))}
    </Main>

    <Footer />
  </>
);

export default IndexPage;

export async function getStaticProps() {
  const articles = allArticles.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });
  return { props: { articles } };
}
