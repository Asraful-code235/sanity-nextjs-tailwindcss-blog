import Image from 'next/image';
import { SelectedPage } from '../shared/types';
import React, { useEffect, useState } from 'react';
import { client, urlFor } from '../../client';

import { motion } from 'framer-motion';
import Link from 'next/link';

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Work = ({ setSelectedPage }: Props) => {
  const [work, setWork] = useState([]);
  const [category, setCategory] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const handleworkFilter = (item: any) => {
    setActiveFilter(item);
    // setAnimateCard([{ y: 100, opacity: 0 }]);
    setTimeout(() => {
      // setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'all') {
        setFilterWork(work);
      } else {
        setFilterWork(work.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  useEffect(() => {
    const query = `*[_type == "category"]{title}`;
    client.fetch(query).then((data) => {
      setCategory(data);
    });
  }, []);

  useEffect(() => {
    const query = `*[_type == "post" || tags == "all"]`;
    client.fetch(query).then((data) => {
      setWork(data);
      setFilterWork(data);
    });
  }, []);
  // console.log(activeFilter);

  return (
    <section id={`${SelectedPage.Work}`}>
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Work)}
        className="w-5/6 mx-auto py-20"
      >
        <h1 className="font-bold text-4xl text-center mt-16 text-gray-50">
          Some of my <span className="text-[#fddda8]">Projects</span>
        </h1>
        <div className="my-12">
          {/* work category */}
          <div className="flex flex-wrap items-center justify-center gap-6 ">
            {category.map((item: any, i) => {
              const lowercase = item.title
                .toLocaleLowerCase()
                .replace(/ /g, '');

              return (
                <div
                  onClick={() => handleworkFilter(lowercase)}
                  key={i}
                  className={`bg-gray-800 p-2 rounded-lg   ${
                    activeFilter === lowercase
                      ? 'bg-[#323436] text-white font-semibold'
                      : ' font-semibold  '
                  }
              `}
                >
                  <div className="capitalize text-gray-100">{lowercase}</div>
                </div>
              );
            })}
          </div>
          <motion.div
            animate={animateCard}
            className="flex flex-wrap items-start justify-start gap-2 mt-16"
          >
            {filterWork.map((work: any, i) => (
              <motion.div
                whileHover={{ scale: [1, 1] }}
                transition={{
                  duration: 0.25,
                  ease: 'easeInOut',
                  staggerChildren: 0.5,
                }}
                key={i}
                className="bg-gray-100 flex rounded-sm  items-start cursor-pointer justify-between flex-col"
              >
                <Link href={`/[slug]`} as={`/${work.slug.current}`}>
                  <div className=" h-[340px] w-[340px] overflow-hidden">
                    <motion.img
                      whileHover={{ scale: [1, 1.2] }}
                      transition={{
                        duration: 0.5,
                        delay: 0.15,
                        ease: 'easeInOut',
                      }}
                      src={urlFor(work.mainImage)}
                      alt="image"
                      width={360}
                      height={400}
                      className=" h-full w-full object-cover object-top"
                    />
                  </div>
                  <div className="gap-4 my-4 p-3">
                    <p className="text-xs text-gray-500">
                      Created At {work._createdAt}
                    </p>
                    <p className="hover:text-[#f6cf8e] transition-colors duration-500 mt-4 text-xl font-medium text-gray-700">
                      {work.title}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Work;
