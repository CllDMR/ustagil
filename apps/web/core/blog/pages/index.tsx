import { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/PageFooter/Footer';
import Header from '../components/PageHeader/Header';
import Main from '../components/PageMain/Main';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

const IndexPage: NextPage<Props> = () => (
  <>
    <Head>
      <title>Index Page</title>
    </Head>

    <Header />

    <Main>
      <article>Index Page</article>
    </Main>

    <Footer />
  </>
);

export default IndexPage;
