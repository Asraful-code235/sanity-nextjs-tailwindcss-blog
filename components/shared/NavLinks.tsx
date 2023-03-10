import Link from 'next/link';
import { SelectedPage } from './types';

type Props = {
  links: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  setIsMenuToggled: (value: boolean) => void;
  isMenuToggled: boolean;
};

const NavLinks = ({
  links,
  selectedPage,
  setSelectedPage,
  setIsMenuToggled,
  isMenuToggled,
}: Props) => {
  const lowercase = links.toLocaleLowerCase().replace(/ /g, '') as SelectedPage;
  return (
    <li
      className={`${
        selectedPage === lowercase ? 'text-white' : ''
      } hover:text-yellow-500 transition duration-500 md:font-medium text-lg font-semibold md:text-sm capitalize text-black-500 md:text-white `}
    >
      <Link
        href={`#${lowercase}`}
        onClick={() => {
          setSelectedPage(lowercase);
          setIsMenuToggled(!isMenuToggled);
        }}
      >
        {links}
      </Link>
    </li>
  );
};

export default NavLinks;
