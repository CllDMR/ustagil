import Head from 'next/head';
import { FunctionComponent, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  title: string;
};

export const BlogLayout: FunctionComponent<Props> = ({ children, title }) => (
  <>
    <Head>
      <title>{title}</title>
    </Head>
    <main>{children}</main>
  </>
);
