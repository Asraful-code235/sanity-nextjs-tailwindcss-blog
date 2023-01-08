import { SelectedPage } from '../shared/types';

type Props = {
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Hero = ({}: Props) => {
  return <div>Hero</div>;
};

export default Hero;
