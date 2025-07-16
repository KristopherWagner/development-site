import { Link } from '@tanstack/react-router';

import { Route } from '../../routes/articles';

export default function ArticlesLink() {
  return (
    <li>
      <Link aria-label="Return home" preload="intent" to={Route.to}>
        <i className="fa-duotone fa-comments fa-fw" />
      </Link>
    </li>
  );
}
