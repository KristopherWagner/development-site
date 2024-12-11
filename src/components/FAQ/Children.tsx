import React from 'react';
import Link from '../Link';

import Question from './Question';

export default function Children() {
  return (
    <>
      <Question>
        Can I bring my young children?
      </Question>
      <p className="body1">
        We have decided to have an adult-only ceremony and reception; however,
        your children are more than welcome to travel with you and attend our rehearsal dinner.
        If you need an in-room sitter for the ceremony and reception, you can use
        {' '}
        <Link
          href="https://kidsniteout.com/"
          text="Kid's Nite Out"
        />
        {' '}
        or a similar service. We appreciate your understanding.
      </p>
    </>
  );
}
