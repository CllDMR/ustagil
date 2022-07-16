import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

export const Logo: FC<Props> = () => (
  <Link href="/" passHref>
    <a>
      <Image
        src="https://dummyimage.com/150x50/fff/aaa"
        alt="Ustagil blog footer logo"
        width={150}
        height={50}
      />
    </a>
  </Link>
);

export default Logo;
