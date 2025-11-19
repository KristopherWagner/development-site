import { Link } from "@tanstack/react-router";

export default function HomeLink() {
  return (
    <li>
      <Link aria-label="Return home" preload="intent" to="/">
        <i className="fa-duotone fa-house fa-fw" />
      </Link>
    </li>
  );
}
