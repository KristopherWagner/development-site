import styles from './Question.module.css';

export default function Question({ children }: React.PropsWithChildren) {
  return (
    <h4 className={styles.heading}>
      <em>{children}</em>
    </h4>
  );
}
