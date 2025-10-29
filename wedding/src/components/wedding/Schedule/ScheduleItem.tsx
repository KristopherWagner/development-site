import styles from './ScheduleItem.module.css';

export default function ScheduleItem(props: {
  dress?: string;
  name: string;
  note?: React.ReactNode;
  when?: string;
  where?: string;
  who?: string;
}) {
  const { dress, note, when, where, who } = props;

  return (
    <>
      <h5 className={styles.heading}>{props.name}</h5>
      <p className="body1">
        {who && `Who: ${who}`}
        {who && <br />}
        {when && `When: ${when}`}
        {when && <br />}
        {where && `Where: ${where}`}
        {where && <br />}
        {dress && `Dress: ${dress}`}
        {note && <br />}
        {note}
      </p>
    </>
  );
}
