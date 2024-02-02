import styles from './table.module.css'

//@ts-ignore
export default function Table({ numChairs, isReserved }) {
    const onTableClick = () => {alert('A table was clicked!')};
    return (
      <div className={styles.table} onClick={onTableClick}>
        <div className={styles.tDisplay}>table img</div>
        <div className={styles.cDisplay}>🪑 x{numChairs}</div>
        <button className={styles.statusButton}>color button</button>
      </div>
    );
  }
  