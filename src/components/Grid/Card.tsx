import { Link } from '@tanstack/react-router';
import clsx from 'clsx';

import styles from './Card.module.css';

export default function Card({
  as = 'div',
  className,
  children,
}: React.PropsWithChildren<{ as?: 'div' | 'li'; className?: string }>) {
  const Component = as;
  return (
    <Component className={clsx(className, styles.card)}>{children}</Component>
  );
}
export function CardLink({
  className,
  children,
  linkProps = {},
  isExternal = false,
  to,
}: React.PropsWithChildren<{
  className?: string;
  isExternal?: boolean;
  linkProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  to: string;
}>) {
  if (isExternal) {
    return (
      <a {...linkProps} className={clsx(className, styles.card)} href={to}>
        {children}
      </a>
    );
  }

  return (
    <Link {...linkProps} className={clsx(className, styles.card)} to={to}>
      {children}
    </Link>
  );
}
