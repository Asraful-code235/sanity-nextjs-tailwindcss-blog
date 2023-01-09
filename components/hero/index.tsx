import Image from 'next/image';
import CustomeBtn from '../shared/CustomeBtn';
import { SelectedPage } from '../shared/types';

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Hero = ({ selectedPage, setSelectedPage }: Props) => {
  return (
    <section
      id={`${SelectedPage.Home}`}
      className="bg-black-500 h-[90vh] pt-16  w-full  "
    >
      <div className="w-5/6 mx-auto text-white  ">
        <div className="py-16 flex  justify-between items-center ">
          {/* content */}
          <div className="flex   flex-col items-start justify-between ">
            <h1 className="text-4xl font-bold  text-[#f8eee6] mb-2">
              Professional{' '}
              <span className="text-[#ffe386] text-5xl">3D Designer</span>{' '}
              specializing in{' '}
              <span className="text-[#ffe386] text-5xl">Blender</span>
            </h1>
            <p className="mb-6 font-medium  text-start text-[#f8eee6] ">
              Need high-quality 3D graphics and models? Look no further! Our
              team of experienced designers, led by our expert in Blender, can
              bring your project to life.
            </p>
            <div className="">
              <CustomeBtn>Contact Me</CustomeBtn>
            </div>
          </div>
          {/* right side */}
          <div className=" h-full basis-3/6  relative">
            <div className=" flex-1 before:absolute before:-top-20 before:-right-20 before:bg-[url('/bgImage.png')] before:z-[-1] ">
              <Image
                src={'/heroImage.jpg'}
                alt="hero-Image"
                width={680}
                height={660}
                priority
                className="w-full h-full bg-cover rounded-lg  bg-right "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
