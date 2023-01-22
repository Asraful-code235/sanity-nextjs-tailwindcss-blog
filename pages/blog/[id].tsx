import { useRouter } from 'next/router';
import { urlFor } from '../../client';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import moment from 'moment';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';
import { client } from '../../client.js';
import Form from '../../components/Form';

interface Blogs {
  content: any;
  body: any;
  _createdAt: any;
  title: string | undefined;
  mainImage: JSX.Element;
  blog: string;
  setBlogs: any[];
  _id: any;
  tags: string[];
}

const builder = imageUrlBuilder(client);

const serializers = {
  types: {
    image: (node: any) => {
      const { url, asset } = node;
      return (
        <img
          src={builder.image(asset).url()}
          alt={url}
          width={360}
          height={400}
        />
      );
    },
  },
};

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<Blogs | null>(null);
  const [relatedBlog, setRelatedBlog] = useState<Blogs | null>(null);
  const [comments, setComments] = useState<Blogs | null>(null);

  useEffect(() => {
    const query = `*[_type == "blogPost" && _id == "${id}"]`;
    client.fetch(query).then((data) => {
      if (data && data.length > 0) {
        setBlog(data[0]);
      }
    });
  }, [id]);

  const fetchRelatedBlog = useCallback(async () => {
    if (blog) {
      const currentTag = blog.tags[0];
      const query = `*[_type == "blogPost" && tags[0] == "${currentTag}" && _id != "${id}"]`;
      try {
        const data = await client.fetch(query);
        setRelatedBlog(data);
      } catch (error) {
        console.error(error);
      }
    }
  }, [id, blog]);

  useEffect(() => {
    if (blog) fetchRelatedBlog();
  }, [blog, fetchRelatedBlog]);

  useEffect(() => {
    // const query = `*[_type == "comment" && references(^._id)]{name,email,_createdAt,message}`;

    const query = `*[_type == "comment" && blogPost._ref == "${id}"]{email,_createdAt,message,name}`;
    client.fetch(query).then((data) => {
      setComments(data);
    });
  }, [id]);

  return (
    <section className="bg-gray-50 w-full  mx-auto min-h-screen text-gray-500 ">
      {blog && (
        <motion.div className="w-full md:w-5/6 mx-auto text-gray-100">
          <Link href={'/#blog'}>
            <button className="mt-16 hover:bg-slate-200 rounded-full bg-[#fdcb75] transition duration-500 p-2 mb-6 font-bold  hover:drop-shadow-lg cursor-pointer ">
              <ArrowLeftIcon className="h-6 w-6 text-white transition duration-500  " />
            </button>
          </Link>
          <article className="grid grid-cols-1 md:grid-cols-4 gap-16 ">
            <motion.div className="mt-8 rounded-t-lg md:col-span-3 col-span-1 shadow ">
              <motion.img
                src={urlFor(blog.mainImage)}
                alt={blog.title}
                className="w-full rounded-md h-auto  "
              />

              <div className="mt-8 px-4 flex justify-between items-center">
                <h1 className="text-gray-600 font-bold text-3xl">
                  {blog.title}
                </h1>
                <p className="text-xs text-gray-800 mb-4">
                  {moment(blog._updatedAt).format('MM/DD/YYYY')}
                </p>
              </div>
              <div className="text-gray-400 px-4 mt-4 text-base">
                <BlockContent blocks={blog.content} serialize={serializers} />
              </div>
            </motion.div>
            <motion.div className="col-span-1 shadow h-min p-4">
              <div className="underline">
                <h1 className="text-gray-800 text-xl font-bold underline-offset-4 underline">
                  Related Posts
                </h1>
              </div>
              <div className="overflow-hidden flex flex-col gap-4 mt-8">
                {relatedBlog &&
                  relatedBlog.map((data: any, index: any) => (
                    <motion.div key={index} className="cursor-pointer">
                      <Link href={`/blog/[id]`} as={`/blog/${data._id}`}>
                        <div className="flex gap-4 items-center justify-start">
                          <img
                            src={urlFor(data.mainImage)}
                            alt={data.title}
                            className="w-12 h-12 rounded-full object-cover object-center"
                          />
                          <div className="flex flex-col items-start justify-center overflow-hidden">
                            <h3 className="text-gray-600 whitespace-nowrap mb-2">
                              {data.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {moment(data._updatedAt).format('MM/DD/YYYY')}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </article>
          <section className="mt-16 w-full md:w-3/5">
            <Form _id={blog._id} />
            <section className="mt-8 shadow text-gray-800 p-4">
              <div className="w-full underline underline-offset-4">
                <h1 className="text-2xl py-6 w-full ">All comments</h1>
              </div>

              {comments?.map((comment: any, index: any) => (
                <motion.div
                  key={index}
                  className="flex  flex-col gap-2 bg-gray-200 mb-2 rounded-md p-2"
                >
                  <div className="flex items-center gap-2 justify-start">
                    <h1 className="text-xl font-semibold">{comment.name}</h1>
                    <p className="text-sm text-gray-500 ">
                      {moment(comment._createdAt).format('MM/DD/YYYY')}
                    </p>
                  </div>
                  <div className="px-2 mb-4 text-base text-gray-500">
                    <p>{comment.message}</p>
                  </div>
                </motion.div>
              ))}
            </section>
          </section>
        </motion.div>
      )}
    </section>
  );
};
export default BlogDetails;
