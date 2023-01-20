import Image from 'next/image';
import CustomeBtn from '../shared/CustomeBtn';
import { SelectedPage } from '../shared/types';
import { motion } from 'framer-motion';

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Hero = ({ selectedPage, setSelectedPage }: Props) => {
  return (
    <section id={`${SelectedPage.Home}`} className=" mx-auto min-h-screen   ">
      {/* content */}
      <motion.div className="flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-10   h-[28rem]  md:h-[38rem] relative xs:before:absolute xs:before:bg-[url('/LandingImage.png')] xs:before:border-none xs:before:top-64 md:before:top-36  xs:before:z[-1] xs:before:w-full xs:before:h-full xs:before:bg-no-repeat before:bg-cover  md:before:bg-cover xs:before:bg-center xs:before:rounded-md xs:before:animate-none xs:before:transition "
        >
          <motion.div className="text-white text-center z-[10] ">
            <h1 className="text-4xl mb-4">
              Professional 3D Designer specializing in Blender
            </h1>
            <p className="text-gray-400 w-5/6 mx-auto text-lg">
              Need high-quality 3D graphics and models? Look no further! Our
              team of experienced designers, led by our expert in Blender, can
              bring your project to life.
            </p>
          </motion.div>

          <motion.div className=" hidden md:flex items-center justify-center absolute -bottom-20 right-0 border-2 border-gray-400 rounded-full w-[35px] h-[66px]">
            <div className="w-[15px] h-[30px] rounded-full bg-gray-100 transition-all duration-500 animate-bounce"></div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
