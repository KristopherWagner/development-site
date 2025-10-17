import clsx from 'clsx';
import styles from './Header.module.css';

export default function Header({
  heading,
  children,
}: React.PropsWithChildren<{ heading: React.ReactNode }>) {
  return (
    <header className={clsx('hyper-legible', styles.header)}>
      <div className={styles.heading}>
        <h1>{heading}</h1>
      </div>
      <div className={styles.content}>{children}</div>
    </header>
  );
}
