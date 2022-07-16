import Link from 'next/link';
import { FC } from 'react';
import { Logo } from './Logo';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export const Footer: FC<Props> = () => (
  <footer className="px-3 py-4 flex bg-blue-100 border-t-2 border-gray-300 border-solid">
    <Logo />
    <div className="flex-1 flex items-center justify-center">
      <Link href="/">Index Page</Link>
    </div>
  </footer>
);

export default Footer;
