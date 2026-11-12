import { imageFolder } from '../../constants';
import styles from './Header.module.css';

export default function Header({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <header className={styles.root}>
        <div className={styles.heading}>
          <img
            alt="Kristopher Wagner headshot"
            loading="lazy"
            src={imageFolder + 'Kristopher.webp'}
          />

          <h1 tabIndex={-1} ref={(ref) => ref?.focus()}>
            {children}
          </h1>
        </div>
      </header>
    </>
  );
}
