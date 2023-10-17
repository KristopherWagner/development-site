import React from 'react';

export default function IndexPage() {
  return (
    <>
      <h1>Welcome!</h1>
      <p>This is my work-in-progress development website</p>
      <p>
        If you're looking for an archive of our wedding website, you can find it{' '}
        <a href="/wedding">here</a>
      </p>
    </>
  );
}

export function Head() {
  const title = "Kristopher Wagner's Development Site";
  const url = 'https://kwagner.dev';
  const description = 'A page dedicated to my personal coding projects';
  const imageUrl =
    'https://kwagner.dev/static/starlight_lounge-cf67d74b7be4b4baf494389267fa8e60.webp';

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="nofollow, noimageindex, noarchive" />
      <link rel="canonical" href={url} />

      {/* Facebook */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="kwagner.dev" />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
