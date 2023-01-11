import { useRouter } from 'next/router';
import { client, urlFor } from '../client';
import { ReactNode, useEffect, useState } from 'react';
import { Props } from 'next/script';
import { motion } from 'framer-motion';
import BlockContent from '@sanity/block-content-to-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';
import Link from 'next/link';

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
  const [work, setWork] = useState<Work | null>(null);
  const [project, setProject] = useState({});

  useEffect(() => {
    if (slug) {
      client
        .fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })
        .then((work) => {
          setWork(work);
        });
    }
  }, [slug]);
  console.log(work);

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
      <div className="relative h-screen ">
        <div className="bg-gray-900 text-white px-6 py-4">
          <Link href={'/#work'}>
            <button className="bg-stone-200 hover:bg-white px-8 py-2 mb-6 text-black-600 font-bold rounded-md hover:drop-shadow-lg cursor-pointer ">
              Go Back
            </button>
          </Link>
          <h1 className="text-4xl font-medium underline">
            Project: {work.title}
          </h1>

          <div className="text-lg"></div>
          <div className="flex justify-between items-center mt-4">
            <div className="text-white">Tag: {work.tags[0]}</div>
            <div className="text-white">{work.publishedAt}</div>
          </div>
          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={2000}
            transitionTime={400}
            className="relative h-[680px]"
          >
            {work.secondaryImages.map((image: any, i: any) => (
              <div key={i} className="  h-full w-full">
                <img
                  key={i}
                  src={urlFor(image)}
                  width={360}
                  height={400}
                  className="h-[680px] w-full object-contain"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className="bg-white shadow p-6 mt-16 py-20 md:w-5/6 mx-auto">
        <h2 className="text-2xl font-medium">About this project</h2>

        <h2 className="text-2xl font-medium mt-4">
          <BlockContent blocks={work.body} />
        </h2>
        <div className="flex flex-wrap items-center">
          <div className="w-1/2 p-2">
            <div className="font-medium">Client:</div>
            {/* <div>{project.client}</div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkPage;
