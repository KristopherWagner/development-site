import { Link } from '@tanstack/react-router';

import { Route } from '../../routes/articles';

export default function ArticlesLink() {
  return (
    <li>
      <Link
        aria-label="Return to the list of articles"
        preload="intent"
        to={Route.to}
      >
        <i className="fa-duotone fa-comments fa-fw" /> <span>Articles</span>
      </Link>
    </li>
  );
}
