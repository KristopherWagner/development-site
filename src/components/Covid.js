import React from 'react';
import styled from 'styled-components';

import { BACKGROUND_LIGHT_TEXT } from './Colors';
import HorizontalRule from './HorizontalRule';
import Link from './Link';

const Youtube = styled.i`
  color: red;
`;

export default function Covid() {
  return (
    <>
      <h3>COVID-19</h3>
      <p className="subtitle1">
        We wish we didn&apos;t have to have this conversation; however, we want to ensure the
        safety of our friends and family as we celebrate together.
      </p>
      <HorizontalRule color={BACKGROUND_LIGHT_TEXT} />
      <h4>Vaccination Requirement</h4>
      <p className="body1">
        Previously we had required that all guests be fully vaccinated before the events.
        After careful consideration, we have decided to rescind this requirement.
        However, we ask that everyone tests before traveling, before the events,
        and upon returning home. We ask that you not attend any of our events if you test
        positive for COVID-19. If you test positive after our event, we ask that you call your
        doctor immediately to discuss
        {' '}
        <Link
          href="https://www.cdc.gov/coronavirus/2019-ncov/your-health/treatments-for-severe-illness.html"
          text="treatment options"
        />
        . We wish to err on the side of caution,
        doing everything in our power to provide the safest venue and for all our guests to feel
        comfortable while attending.
      </p>
      <h4>Masks</h4>
      <p className="body1">
        If you are not fully vaccinated, we ask that you wear masks at all indoor locations.
        We ask that everyone follows the
        {' '}
        <Link
          href="https://www.cdc.gov/coronavirus/2019-ncov/travelers/masks-public-transportation.html"
          text="CDC's guidance"
        />
        {' for wearing masks while traveling. '}
      </p>
      <h4>
        <Link
          ariaLabel="Go to YouTube video"
          href="https://www.youtube.com/watch?v=Rpf97t6mcIg"
          text={<Youtube className="fa-brands fa-youtube" />}
        />
        {' Live Stream'}
      </h4>
      <p className="body1">
        If you cannot attend, you can watch a livestream of our wedding by clicking
        {' '}
        <Link
          href="https://www.youtube.com/watch?v=Rpf97t6mcIg"
          text="here"
        />
        . If for any reason that link does not work,
        {' our videographers have provided a backup link '}
        <Link
          href="https://www.youtube.com/watch?v=Uw75O0ntR3k"
          text="here"
        />
      </p>
    </>
  );
}
