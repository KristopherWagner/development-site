import React from 'react';

import Accommodations from './Accommodations';
import Activities from './Activities';
import HorizontalRule from '../wedding/HorizontalRule';
import Link from '../wedding/Link';

export default function Travel() {
  return (
    <>
      <h3>Travel and Accommodations</h3>
      <p className="subtitle1">
        Our entire wedding will be contained within the Walt Disney World
        Resort. We highly recommend you fly into the Orlando International
        Airport (MCO) and stay on-property at any of the numerous Walt Disney
        World Resort hotels.
      </p>
      <p className="subtitle2">
        <i className="fa-duotone fa-comment-question" />
        {' Need help? Feel free to '}
        <Link href="mailto:kmwagner91@gmail.com" text="email the groom" />
        {' for assistance!'}
      </p>
      <HorizontalRule />
      <h4>Travel</h4>
      <h5>Orlando (MCO)</h5>
      <p className="body1">
        For our out of town guests, the Orlando International Airport (MCO) is
        the closest airport and provides several transportation options to the
        Walt Disney World Resort. If you choose to fly into MCO and are staying
        at a WDW Resort hotel, you can choose to book transportation direct to
        your hotel through{' '}
        <Link
          href="https://www.mearsconnect.com/?AspxAutoDetectCookieSupport=1"
          text="Mears Connect"
        />
        {' or '}
        <Link
          href="https://sunshineflyer.com/?gclid=CjwKCAjwrNmWBhA4EiwAHbjEQIiT6zREtLgWfB-D2zHofMaAqNLMC3_6_5L-XpLcFISs9Cc1YhlJGBoC8ogQAvD_BwE"
          text="The Sunshine Flyer"
        />
        .
      </p>
      <h5>Other Airports</h5>
      <p className="body1">
        Other nearby airports include the Orlando Sanford International Airport
        (SFB) and Tampa International Airport (TPA), however these are further
        away and will require a rental car or taxi. Prefer to travel by train?
        You can bring your car on the{' '}
        <Link
          href="https://www.amtrak.com/auto-train"
          text="Amtrack Autotrain"
        />{' '}
        from Lorton, VA to Sanford, FL.
      </p>
      <HorizontalRule />
      <Accommodations />
      <HorizontalRule />
      <Activities />
    </>
  );
}
