import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/hero';
import { useState } from 'react';
import { SelectedPage } from '../components/shared/types';
import About from '../components/about';
import Work from '../components/work';

export default function Home() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  return (
    <Layout
      title="Home"
      selectedPage={selectedPage}
      setSelectedPage={setSelectedPage}
    >
      <Hero selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <About selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <Work setSelectedPage={setSelectedPage} />
    </Layout>
  );
}
