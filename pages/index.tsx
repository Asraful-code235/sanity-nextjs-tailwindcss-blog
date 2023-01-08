import Head from 'next/head';
import Layout from '../components/Layout';
import Hero from '../components/hero';
import { useState } from 'react';
import { SelectedPage } from '../components/shared/types';

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
    </Layout>
  );
}
