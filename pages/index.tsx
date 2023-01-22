import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/hero';
import { useEffect, useState } from 'react';
import { SelectedPage } from '../components/shared/types';
import About from '../components/about';
import Work from '../components/work';
import Contact from '../components/contact';
import Blog from '../components/blog';

export default function Home() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );

  useEffect(() => {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });
  }, []);

  return (
    <Layout
      title="Home"
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
    >
      <Hero selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <About selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <Work setSelectedPage={setSelectedPage} />
      <Blog setSelectedPage={setSelectedPage} />
      <Contact setSelectedPage={setSelectedPage} />
    </Layout>
  );
}
