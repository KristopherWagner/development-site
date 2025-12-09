import styles from './Footer.module.css';

export default function Footer({ children }: React.PropsWithChildren<{}>) {
  return (
    <footer className={styles.root}>
      <ul>{children}</ul>
    </footer>
  );
}
