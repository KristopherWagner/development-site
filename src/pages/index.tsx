import { Link } from "gatsby"
import React from 'react';

import Seo from '../components/SEO';

export default function IndexPage() {
  return (
    <>
      <h1>Welcome!</h1>
      <p>This is my work-in-progress development website</p>
      <p>
        If you're looking for an archive of our wedding website, you can find it{' '}
        <Link to="/wedding">here</Link>
      </p>
    </>
  );
}

export const Head = () => (
  <Seo
    description="A page dedicated to my personal coding projects"
    imageUrl="https://kwagner.dev/static/starlight_lounge-cf67d74b7be4b4baf494389267fa8e60.webp"
    title="Kristopher Wagner's Development Site"
    url="https://kwagner.dev"
  />
);
