import { motion } from 'framer-motion';
import { MdOutlineMarkEmailUnread } from 'react-icons/md';
import { BsTelephoneOutbound } from 'react-icons/bs';
import { SelectedPage } from '../shared/types';

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Contact = ({ setSelectedPage }: Props) => {
  return (
    <section id={`${SelectedPage.Contact}`} className="bg-slate-100">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Contact)}
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        id="contact"
        className="mt-36 min-h-screen prose pt-24 flex items-center flex-col py-24"
      >
        <h1 className="capitalize text-3xl font-bold mt-16">
          Lets get in <span className="text-[#fdcb75]">touch</span>
        </h1>
        <motion.div className="flex items-center flex-col md:flex-row gap-10 mt-16  w-full justify-center">
          <motion.div
            whileHover={{ scale: [1, 1.05] }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-[#3c1aa3] w-72  text-white px-4 py-3 flex items-center justify-center rounded-md "
          >
            <MdOutlineMarkEmailUnread className="mx-4" color="crimson" />
            <a href="mailto:shoagasraful4231@gmail.com" className="text-sm">
              shoagasraful4231@gmail.com
            </a>
          </motion.div>
          <motion.div
            whileHover={{ scale: [1, 1.05] }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-[#3c1aa3] w-72 text-white px-4 py-3 flex items-center justify-center rounded-md "
          >
            <BsTelephoneOutbound className="mx-4" color="#43ccbd" />
            <a href="tel:+8801609546741" className="text-sm">
              +8801609546741
            </a>
          </motion.div>
        </motion.div>
        <form className=" mt-12 items-center w-2/3">
          <div className="form-control mb-4">
            <label className="label mb-2">
              <span className="label-text text-slate-700 font-semibold">
                Your Email
              </span>
            </label>
            <label className="input-group">
              <span className="text-slate-600 bg-slate-200">Email</span>
              <input
                type="text"
                placeholder="example@gmail.com"
                className="input  bg-slate-200 w-full"
              />
            </label>
          </div>
          <div className="form-control mb-4">
            <label className="label mb-2">
              <span className="label-text text-slate-700 font-semibold">
                Message
              </span>
            </label>
            <textarea
              className="textarea  h-24 w-full bg-slate-200"
              placeholder="Write message"
            ></textarea>
          </div>
          <motion.div
            whileHover={{ scale: [1, 1.05] }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex mt-6 items-center justify-center"
          >
            <button className="btn bg-[#3c1aa3] btn-primary capitalize btn-wide ">
              Send message
            </button>
          </motion.div>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
