import Image from 'next/image';
import NavLinks from './shared/NavLinks';
import CustomeBtn from './shared/CustomeBtn';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import useMediaQuery from './hooks/useMediaQuery';
import { useState } from 'react';
import { SelectedPage } from './shared/types';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (valud: SelectedPage) => void;
};

const Header = ({ selectedPage, setSelectedPage }: Props) => {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediaScreens = useMediaQuery('(min-width: 1060px)');

  return (
    <nav className="fixed top-0 z-50 left-0 right-0 bg-[#070707] backdrop-blur-lg">
      <motion.div className="w-5/6   mx-auto py-6">
        <div className="flex justify-between items-center">
          {/* logo */}
          <motion.div
            initial={{
              x: -50,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{ duration: 0.5, ease: 'easeIn' }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link href="./" className="flex items-center gap-2">
              <Image
                src={'/logo.png'}
                alt="Logo"
                width={55}
                height={55}
                className="w-[35px] h-[35px] rounded-full shadow transition duration-700 "
              />
              <p className="text-[18px] uppercase text-white">Shoheb</p>
            </Link>
          </motion.div>
          {/* Links */}
          {isAboveMediaScreens ? (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.2, delay: 0.2 }}
              className="flex w-full gap-8 justify-end items-center"
            >
              {/* nav Links */}
              <ul className="flex gap-6 ">
                {['home', 'about', 'work', 'blog', 'contact'].map((links) => (
                  <NavLinks
                    setIsMenuToggled={setIsMenuToggled}
                    isMenuToggled={isMenuToggled}
                    selectedPage={selectedPage}
                    setSelectedPage={setSelectedPage}
                    key={links}
                    links={links}
                  />
                ))}
              </ul>
              {/* contact */}
            </motion.div>
          ) : (
            <div>
              {isMenuToggled ? (
                <div
                  className="p-2 transition duration-500"
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
                >
                  <XMarkIcon className="h-6 w-6 text-white" />
                </div>
              ) : (
                <div
                  className="p-2 transition duration-500"
                  onClick={() => setIsMenuToggled(!isMenuToggled)}
                >
                  <Bars3Icon className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
      {!isAboveMediaScreens && isMenuToggled && (
        <div className="  absolute top-30 h-screen right-0 left-0 bg-black-600 z-[-1]  bg-opacity-70 ">
          <div className="w-5/6 z-40 opacity-100 mx-auto mt-16 bg-white px-6 py-16 rounded-lg ">
            <ul
              className={`flex justify-center items-center flex-col  md:flex-row gap-8 `}
            >
              {['home', 'about', 'work', 'blog', 'contact'].map((links) => (
                <NavLinks
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                  key={links}
                  links={links}
                  setIsMenuToggled={setIsMenuToggled}
                  isMenuToggled={isMenuToggled}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
