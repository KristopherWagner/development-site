import { Link } from '@tanstack/react-router';

import { Route } from '../../routes/blog';

export default function BlogLink() {
  return (
    <li>
      <Link aria-label="Return to blog" preload="intent" to={Route.to}>
        <i className="fa-duotone fa-comment-pen fa-fw" />
        <span>Blog</span>
      </Link>
    </li>
  );
}
