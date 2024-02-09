import styles from './table.module.css'

//@ts-ignore
export default function Table({id, isReserved, partyName, numSeats, order, onTableClick}: tableProps) {
  // A small collection of elements which show the status and information about a given table.
  // additionally, provides function to update current table status.

  const availability = isReserved ? styles.tableNotAvailable : styles.tableAvailable;
    return (
      <div className={[styles.table, availability].join(' ')} onClick={onTableClick}>
        <div className={styles.tDisplay}><img src="/final_table.png"></img></div>
        <div className={styles.cDisplay}>🪑 x{numSeats}</div>
        <button className={styles.statusButton}>{isReserved ? 'Reserved' : 'Open'}</button>
      </div>
    );
  }
  