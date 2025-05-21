import { Link } from '@tanstack/react-router';

import { Route } from '../../routes/cookbook';

export default function CookbookLink() {
  return (
    <Link aria-label="Return to cookbook" preload="intent" to={Route.to}>
      <i className="fa-duotone fa-book-open-cover fa-2x fa-fw" />
    </Link>
  );
}
