import { type Article } from 'contentlayer/generated';
import { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/PageFooter/Footer';
import Header from '../components/PageHeader/Header';
import Main from '../components/PageMain/Main';

type IndexPageProps = {
  articles: Article[];
};

const IndexPage: NextPage<IndexPageProps> = () => (
  <>
    <Head>
      <title>Ustagil Blog</title>
    </Head>

    <Header />

    <Main>
      <div className="prose max-w-none">
        <h1>This is Ustagil Blogging website</h1>
      </div>
    </Main>

    <Footer />
  </>
);

export default IndexPage;
