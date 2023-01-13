import { useRouter } from 'next/router';
import { client, urlFor } from '../client';
import { ReactNode, useEffect, useState } from 'react';
import { Props } from 'next/script';
import { motion } from 'framer-motion';
import BlockContent from '@sanity/block-content-to-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import 'react-id-swiper/lib/styles/swiper.css';

interface Work {
  tags: any;
  publishedAt: ReactNode;
  body: any;
  secondaryImages: any;
  title: string;
  description: string;
  mainImage: any;
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (!work) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <div className="relative h-auto bg-gray-900">
        <div className="bg-gray-900 text-white px-6 py-6 flex flex-col ">
          <Link href={'/#work'}>
            <button className=" hover:bg-slate-200 rounded-full bg-[#fdcb75] transition duration-500 p-2 mb-6 font-bold  hover:drop-shadow-lg cursor-pointer ">
              <ArrowLeftIcon className="h-6 w-6 text-white transition duration-500  " />
            </button>
          </Link>
          <div className="text-start mt-20 w-5/6 mx-auto">
            <h1 className="text-4xl mb-4 uppercase font-medium text-[#fdcb75] ">
              {work.title}
            </h1>
            <div className="whitespace-normal md:w-4/6 w-full pb-6">
              <BlockContent blocks={work.body} />
            </div>
          </div>

          <div className="h-[400px] sm:h-[650px]  md:h-[750px] w-5/6 mx-auto border-b-2 border-slate-800 ">
            <img
              src={urlFor(work.mainImage)}
              alt={'3d-main-image'}
              className="w-full h-full  bg-contain bg-top"
            />
          </div>
          <div className="flex mt-2 mb-2 flex-col md:flex-row justify-center items-center gap-2">
            {work.secondaryImages.map((image: any, i: any) => (
              <div
                key={i}
                onClick={() => {
                  setIsClicked(!isClicked);
                  setCurrentIndex(i);
                }}
                className="  h-[400px] w-full cursor-pointer  md:w-3/6"
              >
                <img
                  key={i}
                  src={urlFor(image)}
                  // width={360}
                  // height={400}
                  className="h-full w-full rounded-md object-center object-center"
                />
              </div>
            ))}
          </div>

          {isClicked && (
            <div className="bg-slate-900 h-screen  w-full   fixed inset-0 ">
              <div
                onClick={() => setIsClicked(!isClicked)}
                className="my-6 ml-4 rounded-full  cursor-pointer w-min p-2 hover:bg-white "
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
                      src={urlFor(image)}
                      className="h-full w-5/6 mx-auto rounded-md object-center object-center"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* <Carousel
                showThumbs={false}
                infiniteLoop={true}
                // autoPlay={true}
                ref={carouselRef}
                selectedItem={currentIndex}
                {...settings}
                interval={2000}
                transitionTime={400}
                className="relative mt-28 w-full md:mt-0 h-auto md:w-5/6 mx-auto "
              >
                {work.secondaryImages.map((image: any) => (
                  <div key={isIndex} className=" h-auto md:h-[680px] w-full">
                    <img
                      key={isIndex}
                      src={urlFor(image)}
                      // width={360}
                      // height={400}
                      className="h-full w-full rounded-md object-center object-center"
                    />
                  </div>
                ))}
              </Carousel> */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorkPage;
