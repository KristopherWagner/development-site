import { Link } from '@tanstack/react-router';

import { Route } from '../../routes/index';

export default function HomeLink() {
  return (
    <li>
      <Link aria-label="Return home" preload="intent" to={Route.to}>
        <i className="fa-duotone fa-house fa-fw" /> <span>Home</span>
      </Link>
    </li>
  );
}
