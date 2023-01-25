import { useRouter } from 'next/router';
import { client, urlFor } from '../client';
import { ReactNode, useEffect, useState } from 'react';
import { Props } from 'next/script';
import { motion } from 'framer-motion';
import BlockContent from '@sanity/block-content-to-react';
// import { BlockContentSerializer } from '@sanity/block-content-to-react';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface Work {
  tags: any;
  publishedAt: ReactNode;
  body: any;
  secondaryImages: any;
  title: string;
  description: string;
  mainImage: any;
  block: any;
}

const WorkPage = ({}: Props) => {
  const router = useRouter();
  const { slug } = router.query;
  const [currentIndex, setCurrentIndex] = useState(0);

  const [work, setWork] = useState<Work | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    if (slug) {
      client
        .fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })
        .then((work) => {
          setWork(work);
        });
    }
  }, [slug]);

  useEffect(() => {
    setCurrentIndex(currentIndex);
  }, [currentIndex]);

  if (!work) {
    return <div>Loading...</div>;
  }

  return (
    <section className="bg-[#090909] w-full  mx-auto">
      <div className="relative h-auto ">
        <div className=" text-gray-400 px-6 py-6 flex flex-col ">
          <Link href={'/#work'}>
            <button className="ml-8 hover:bg-slate-200 rounded-full bg-[#fdcb75] transition duration-500 p-2 mb-6 font-bold  hover:drop-shadow-lg cursor-pointer ">
              <ArrowLeftIcon className="h-6 w-6 text-white transition duration-500  " />
            </button>
          </Link>
          <div className="text-start mb-4 mt-6 w-5/6 mx-auto">
            <h1 className="text-4xl mb-4 uppercase font-medium text-[#fdcb75] ">
              {work.title}
            </h1>
            <div className="whitespace-normal text-gray-100 md:w-4/6 w-full pb-6">
              {/* <h1>{work.body}</h1> */}
              <BlockContent blocks={work.body} />
            </div>
          </div>

          <div className="w-full md:w-5/6 mx-auto">
            <div className=" h-[500px] w-full">
              <img
                src={urlFor(work.mainImage).toString()}
                alt={'3d-main-image'}
                className="w-full h-full rounded-t-md  object-cover object-center"
              />
            </div>
            <div className="flex  mb-2 flex-col md:flex-row justify-center items-center ">
              {work.secondaryImages.map((image: any, i: any) => (
                <div
                  key={i}
                  onClick={() => {
                    setIsClicked(!isClicked);
                    setCurrentIndex(i);
                  }}
                  className="  h-[350px] w-full cursor-pointer  "
                >
                  <img
                    key={image + i}
                    src={urlFor(image).toString()}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {isClicked && (
            <div className="bg-[#090909] h-screen  w-full   fixed inset-0 ">
              <div
                onClick={() => setIsClicked(!isClicked)}
                className="my-2 ml-4 rounded-full  cursor-pointer w-min p-2 hover:bg-white "
              >
                <XMarkIcon className="w-6 h-6 text-[#fdcb75]" />
              </div>
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => setCurrentIndex(currentIndex)}
                initialSlide={currentIndex}
              >
                {work.secondaryImages.map((image: any, i: any) => (
                  <SwiperSlide key={i}>
                    <img
                      src={urlFor(image).toString()}
                      className="h-screen w-5/6 mx-auto rounded-md object-center object-center"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkPage;
