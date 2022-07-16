import Link from 'next/link';
import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export const Navigation: FC<Props> = () => (
  <nav className="flex-1 flex gap-3 items-center justify-center">
    <Link href="/blogs/blog-1">Blog - 1</Link>
    <Link href="/blogs/blog-2">Blog - 2</Link>
    <Link href="/blogs/blog-3">Blog - 3</Link>
    <Link href="/blogs/blog-4">Blog - 4</Link>
  </nav>
);

export default Navigation;
