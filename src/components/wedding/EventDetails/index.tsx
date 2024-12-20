import clsx from 'clsx';
import React from 'react';

import Link from '../Link';

import * as styles from './EventDetails.module.css';

export default function Event() {
  return (
    <>
      <h3 className="montserrat">
        <i className={clsx('fa-duotone fa-calendar-heart', styles.icon)} />
        <br />
        Our Wedding Day
      </h3>
      <p className="body1">10th March, 2023</p>
      <h4 className="montserrat">
        <i className={clsx('fa-duotone fa-rings-wedding', styles.icon)} />
        <br />
        Ceremony
      </h4>
      <p className="body1">
        7:30pm
        <br />
        The Wedding Pavilion at Disney&apos;s Grand Floridian Resort and Spa
        <br />
        <Link
          ariaLabel="Go to YouTube video"
          href="https://www.youtube.com/watch?v=Rpf97t6mcIg"
          text={<i className={clsx('fa-brands fa-youtube', styles.youtube)} />}
        />{' '}
        <Link
          href="https://www.youtube.com/watch?v=Rpf97t6mcIg"
          text={<strong>Click here to watch it live</strong>}
        />
      </p>
      <h4 className="montserrat">
        <i className={clsx('fa-duotone fa-champagne-glasses', styles.icon)} />
        <br />
        Reception
      </h4>
      <p className="body1">
        8:30pm
        <br />
        Italy Isola at Disney&apos;s EPCOT
      </p>
    </>
  );
}
