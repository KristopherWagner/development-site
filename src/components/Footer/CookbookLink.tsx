import { Link } from '@tanstack/react-router';

import { Route } from '../../routes/cookbook';

export default function CookbookLink() {
  return (
    <li>
      <Link aria-label="Return to cookbook" preload="intent" to={Route.to}>
        <i className="fa-duotone fa-book-open-cover fa-fw" />{' '}
        <span>Cookbook</span>
      </Link>
    </li>
  );
}
