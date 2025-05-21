import { Link } from '@tanstack/react-router';

import { Route } from '../../routes/index';

export default function HomeLink() {
  return (
    <Link aria-label="Return home" preload="intent" to={Route.to}>
      <i className="fa-duotone fa-house fa-fw" />
    </Link>
  );
}
