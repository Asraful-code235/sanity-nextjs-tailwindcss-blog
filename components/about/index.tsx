import Image from 'next/image';
import { SelectedPage } from '../shared/types';
import { motion } from 'framer-motion';

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const About = ({ selectedPage, setSelectedPage }: Props) => {
  return (
    <section id={`${SelectedPage.About}`} className="">
      <motion.div
        whileInView={{
          y: [200, 0],
          opacity: [0, 1],
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
        onViewportEnter={() => setSelectedPage(SelectedPage.About)}
        className="mx-auto w-full md:w-5/6 py-20"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center text-yellow-500 font-bold text-5xl py-10  w-full h-full "
        >
          <div className="">Get to know me </div>
        </motion.h1>
        <div className="md:before:absolute overflow-visible   md:before:opacity-20 md:before:z-[-1] md:before:bg-contain md:before:bg-left md:before:bg-no-repeat md:before:w-full md:before:h-full   md:before:-top-32 md:before:left-[10rem]  md:before:bg-[url('/bgImage.png')]   flex flex-col sm:flex-row justify-center md:justify-between px-20 gap-16   py-2 rounded-md  items-center relative w-full h-full">
          {/* image */}
          <div className="h-[360px] w-[360px] ">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="bg-yellow-400 rounded-full overflow-hidden"
            >
              <motion.img
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.9 }}
                src={'/personImage.png'}
                alt="logo-overlay"
                width={240}
                height={240}
                className="w-full h-[360px] object-contain object-top rounded-lg 
                 "
              />
            </motion.div>
          </div>
          <div className="md:basis-3/5 flex-1 bg-transparent backdrop-blur-md ">
            {/* content */}
            <div className="text-slate-800 font-semibold ">
              Highly skilled 3D graphic designer with passion for creating
              visually stunning digital content. Specializing in Blender, Adept
              at creating realistic & stylized 3D assets & scenes. Proven track
              record of delivering high-quality work for clients. Strong in
              problem-solving, meeting tight deadlines & communcation. Keen eye
              for detail. Ready to bring your ideas to life, Contact me for your
              next project
            </div>
            <div className="mt-6">
              <h4 className="uppercase font-semibold text-md mb-4">skills</h4>
              <motion.div
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={container}
                className="flex justify-start items-center gap-4 flex-wrap "
              >
                {['Figma', 'Blender', 'Adobe Illustor', '3d Model'].map(
                  (skills: string) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={skills}
                      transition={{ duration: 0.5, delay: 1 }}
                      className="bg-slate-300 rounded-lg p-2"
                    >
                      <div className="text-sm font-bold cursor-pointer ">
                        {skills}
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
