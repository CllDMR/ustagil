import Link from 'next/link';
import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export const Navigation: FC<Props> = () => (
  <nav className="flex items-center justify-center flex-1 gap-3">
    <Link href="/">Home</Link>
    <Link href="/articles">Articles</Link>
    <Link href="/about">About</Link>
  </nav>
);

export default Navigation;
