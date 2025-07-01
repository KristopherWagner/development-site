import clsx from 'clsx';
import styles from './Footer.module.css';

export default function Footer({ children }: React.PropsWithChildren<{}>) {
  return (
    <footer className={clsx('hyper-legible', styles.footer)}>
      <ul>{children}</ul>
    </footer>
  );
}
