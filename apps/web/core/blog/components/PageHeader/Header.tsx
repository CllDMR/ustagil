import { FC } from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export const Header: FC<Props> = () => (
  <header className="flex px-4 py-3 bg-blue-100 border-b border-gray-300 border-solid shadow">
    <Logo />
    <Navigation />
  </header>
);

export default Header;
