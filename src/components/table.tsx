// import styles from './table.module.css'

// //@ts-ignore
// export default function Table({id, isReserved, partyName, numSeats, order, onTableClick}: tableProps) {
//   // A small collection of elements which show the status and information about a given table.
//   // additionally, provides function to update current table status.
// console.log("Data:", data);
//   console.log("id:", data.table_id);
//   console.log("numSeats:", data.max_customer);
//   console.log("available?:", data.table_available);

//   const availability = isReserved ? styles.tableNotAvailable : styles.tableAvailable;
//     return (
//       <div className={[styles.table, availability].join(' ')} onClick={onTableClick}>
//         <div className={styles.tDisplay}><img src="/final_table.png"></img></div>
//         <div className={styles.cDisplay}>🪑 x{numSeats}</div>
//         <button className={styles.statusButton}>{isReserved ? 'Reserved' : 'Open'}</button>
//       </div>
//     );
//   }

import { useState } from "react";
import styles from "./table.module.css";

export default function Table({ index, data, handleClick }: { index: number, data: TableData, handleClick: Function }) {
  // takes a parameter of data, of type TableData, which we define in table-interface

  const availabilityStyle = data.table_available
    ? styles.tableAvailable
    : styles.tableNotAvailable;

  return (
    <div
      className={[styles.table, availabilityStyle].join(" ")}
      onClick={() => {handleClick(index)}}
    >
      <div className={styles.tDisplay}>
        <img src="/final_table.png" alt="Table" />
      </div>
      <div className={styles.cDisplay}>🪑 x{data.max_customer}</div>
      <button className={styles.statusButton}>
        {data.table_available ? `${data.table_id} - Open` : `${data.table_id} - Reserved`}
      </button>
    </div>
  );
}
