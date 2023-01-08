import Link from 'next/link';

type Props = {
  children: string;
};

const CustomeBtn = ({ children }: Props) => {
  return (
    <button className="text-white font-bold bg-[#fdcb75] hover:drop-shadow-lg rounded-md px-4 py-2">
      <Link href={'#contact'}> {children}</Link>
    </button>
  );
};

export default CustomeBtn;
