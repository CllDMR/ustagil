import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Main: FC<Props> = ({ children }) => (
  <main className="container mx-auto px-4 py-6 min-h-screen">{children}</main>
);

export default Main;
