import Head from 'next/head';
import { FunctionComponent, ReactNode } from 'react';
import Footer from '../components/PageFooter/Footer';
import Header from '../components/PageHeader/Header';
import Main from '../components/PageMain/Main';

type Props = {
  children: ReactNode;
  title: string;
};

export const BlogLayout: FunctionComponent<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>

    <Header />

    <Main>
      <article>{children}</article>
    </Main>

    <Footer />
  </>
);
