import useProgressiveImage from './useProgressiveImage';

import styles from './Parallax.module.css';

export default function Parallax({
  aspectRatio,
  mobile = false,
  url,
  ...rest
}: {
  aspectRatio: string;
  mobile?: boolean;
  url: string;
}) {
  const imgSrc = useProgressiveImage(url);

  const className = mobile ? styles.mobileParallax : styles.desktopParallax;

  return (
    <div
      className={className}
      style={{
        aspectRatio,
        backgroundImage: `url(${imgSrc || ''})`,
        backgroundRepeat: 'no-repeat',
      }}
      {...rest}
    />
  );
}
