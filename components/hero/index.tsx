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
    <section
      id={`${SelectedPage.Home}`}
      className="bg-black-500 h-full md:h-[90vh] pt-16 py-20 md:py-0  w-full  "
    >
      <div className="md:w-5/6 w-full mx-auto text-white  ">
        <div className="py-6 flex flex-col-reverse md:flex-row   justify-between items-center ">
          {/* content */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex  w-5/6 md:w-full basis-4/5 md:-mt-20 mt-20  flex-col items-start justify-between "
          >
            <h1 className="md:text-4xl text-3xl font-bold  text-[#f8eee6] mb-2">
              Professional{' '}
              <span className="text-[#ffe386] text-4xl md:text-5xl">
                3D Designer
              </span>{' '}
              specializing in{' '}
              <span className="text-[#ffe386] text-4xl md:text-5xl">
                Blender
              </span>
            </h1>
            <p className="mb-6 font-medium  text-start text-[#f8eee6] ">
              Need high-quality 3D graphics and models? Look no further! Our
              team of experienced designers, led by our expert in Blender, can
              bring your project to life.
            </p>
            <div className="">
              <CustomeBtn>Contact Me</CustomeBtn>
            </div>
          </motion.div>
          {/* right side */}
          <motion.div className="min-h-[20rem] pt-20 md:pt-0 md:min-h-[41rem] w-full relative">
            <motion.div className='before:absolute before:rounded-t-lg  before:left-0 md:before:left-20 before:-top-20 before:bg-no-repeat before:right-0 before:bg-cover before:bg-right md:before:-right-36 before:bottom-0 before:bg-[url("/heroImage.jpg")] before:rounded-l-2xl'></motion.div>
            {/* <div className=" before:">
              <Image
                src={'/heroImage.jpg'}
                alt="hero-Image"
                width={400}
                height={400}
                className="h-full bg-cover rounded-lg  bg-center "
              />
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
