import Link from 'next/link';
import { FC } from 'react';
import { Logo } from './Logo';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export const Footer: FC<Props> = () => (
  <footer className="flex px-4 py-3 bg-blue-100 border-t-2 border-gray-300 border-solid">
    <Logo />
    <div className="flex items-center justify-center flex-1 gap-3">
      <Link href="/">Home</Link>
      <Link href="/articles">Articles</Link>
      <Link href="/about">About</Link>
    </div>
  </footer>
);

export default Footer;
