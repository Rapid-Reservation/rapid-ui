// import styles from './table.module.css'

// //@ts-ignore
// export default function Table({id, isReserved, partyName, numSeats, order, onTableClick}: tableProps) {
//   // A small collection of elements which show the status and information about a given table.
//   // additionally, provides function to update current table status.

//   const availability = isReserved ? styles.tableNotAvailable : styles.tableAvailable;
//     return (
//       <div className={[styles.table, availability].join(' ')} onClick={onTableClick}>
//         <div className={styles.tDisplay}><img src="/final_table.png"></img></div>
//         <div className={styles.cDisplay}>🪑 x{numSeats}</div>
//         <button className={styles.statusButton}>{isReserved ? 'Reserved' : 'Open'}</button>
//       </div>
//     );
//   }

// import { useState } from "react";
// import styles from "./table.module.css";

// export default function Table(data: TableData) {
//   console.log("id:", data.table_id);
//   console.log("numSeats:", data.max_customer);
//   console.log("isReserved?:", data.table_avaliable);
//   const [isReserved, setReserved] = useState<boolean>(data.table_avaliable);

//   const availability = isReserved
//     ? styles.tableNotAvailable
//     : styles.tableAvailable;

//   const handleClick = () => {
//     // Toggle the reservation state
//     setReserved((prevReserved) => !prevReserved);

//     // Execute the provided click handler
//     // onTableClick();
//   };

//   return (
//     <div
//       className={[styles.table, availability].join(" ")}
//       onClick={handleClick}
//     >
//       <div className={styles.tDisplay}>
//         <img src="/final_table.png" alt="Table" />
//       </div>
//       <div className={styles.cDisplay}>🪑 x{data.max_customer}</div>
//       <button className={styles.statusButton}>
//         {isReserved ? "Reserved" : "Open"}
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import styles from "./table.module.css";

export default function Table(data: TableData) {
  const [available, setAvailable] = useState<boolean>(data.table_available);
  console.log("Data:", data);
  console.log("id:", data.table_id);
  console.log("numSeats:", data.max_customer);
  console.log("available?:", data.table_available);

  const availability = data.table_available
    ? styles.tableAvailable
    : styles.tableNotAvailable;

  const handleClick = () => {
    setAvailable((prevAvailable) => !prevAvailable);
  };

  return (
    <div
      className={[styles.table, availability].join(" ")}
      onClick={handleClick}
    >
      <div className={styles.tDisplay}>
        <img src="/final_table.png" alt="Table" />
      </div>
      <div className={styles.cDisplay}>🪑 x{data.max_customer}</div>
      <button className={styles.statusButton}>
        {available ? "Reserved" : "Open"}
      </button>
    </div>
  );
}
