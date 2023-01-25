import { useState, useEffect } from 'react';
import { SelectedPage } from '../shared/types';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import moment from 'moment';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { client, urlFor } from '../../client';
import Link from 'next/link';
type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const items = [
  {
    image: '/personImage.png',
    date: 'Created At 2023',
    text: 'This is a test',
  },
  {
    image: '/personImage2.png',
    date: 'Created At 2022',
    text: 'This is another test',
  },
  {
    image: '/personImage2.png',
    date: 'Created At 2022',
    text: 'This is another test',
  },
  {
    image: '/personImage2.png',
    date: 'Created At 2022',
    text: 'This is another test',
  },
  {
    image: '/personImage2.png',
    date: 'Created At 2022',
    text: 'This is another test',
  },
  {
    image: '/personImage2.png',
    date: 'Created At 2022',
    text: 'This is another test',
  },
  // add more items here
];

const Blog = ({ setSelectedPage }: Props) => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const query = `*[_type == "blogPost"]{_id ,excerpt,title,_createdAt,mainImage,tag}`;
    client.fetch(query).then((data) => {
      setBlog(data);
    });
  }, []);

  return (
    <section
      id={`${SelectedPage.Blog}`}
      className="min-h-screen md:w-5/6 w-full mx-auto pt-10 "
    >
      <motion.div
        className="py-20 text-gray-100 
      "
      >
        <h1 className="text-center text-4xl font-bold">
          My <span className="text-[#fddda8]">Blog</span>{' '}
        </h1>
        <motion.div className="scrollbar scroll-smooth mt-16 overflow-hidden   ">
          <motion.div className="flex gap-2  items-start justify-start relative">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={5}
              slidesPerView={3}
              navigation
              breakpoints={{
                320: { slidesPerView: 1 },
                798: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              draggable="true"
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}

              // onSlideChange={() => setCurrentIndex(currentIndex)}
              // initialSlide={currentIndex}
            >
              {blog?.map((item: any, i: any) => (
                <SwiperSlide key={i} className="max-w-[380px] min-w-[380px]">
                  {item._id && (
                    <Link href={`/blog/[id]`} as={`/blog/${item._id}`}>
                      <motion.div
                        key={i}
                        whileHover={{ scale: [1, 1] }}
                        transition={{
                          duration: 0.25,
                          ease: 'easeInOut',
                          staggerChildren: 0.5,
                        }}
                        className="bg-gray-100 flex rounded-sm rounded-t-md  items-start cursor-pointer justify-between flex-col"
                      >
                        <div className=" h-[280px]  w-[380px]  overflow-hidden">
                          <motion.img
                            whileHover={{ scale: [1, 1.2] }}
                            transition={{
                              duration: 0.5,
                              delay: 0.15,
                              ease: 'easeInOut',
                            }}
                            src={urlFor(item.mainImage).toString()}
                            alt="image"
                            width={360}
                            height={400}
                            className=" h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="gap-4 my-4 p-3 text-start ">
                          <h3 className="text-lg font-semibold mb-1 text-gray-600">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-500 mb-4">
                            {moment(item._createdAt).format('MM/DD/YYYY')}
                          </p>

                          <p className="hover:text-[#f6cf8e] text-base transition-colors duration-500 mt-4  font-medium text-gray-700">
                            {item.excerpt}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Blog;
