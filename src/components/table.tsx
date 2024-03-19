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

export default function Table({ data }: { data: TableData }) {
  // takes a parameter of data, of type TableData, which we define in table-interface
  const [available, setAvailable] = useState<boolean>(data.table_available);

  const url = "https://rapid-api-rho.vercel.app/";

  const availabilityStyle = available
    ? styles.tableAvailable
    : styles.tableNotAvailable;

  const handleClick = async () => {
    try {
      // Toggle the local state
      setAvailable((prevAvailable) => !prevAvailable);

      // Determine the endpoint based on the current availability
      const endpoint = available
        ? `${url}table/set/${data.table_id}`
        : `${url}table/clear/${data.table_id}`;

      // Send a POST request to the determined endpoint to update the availability state
      await fetch(endpoint, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error updating table availability:", error);
    }
  };

  return (
    <div
      className={[styles.table, availabilityStyle].join(" ")}
      onClick={handleClick}
    >
      <div className={styles.tDisplay}>
        <img src="/final_table.png" alt="Table" />
      </div>
      <div className={styles.cDisplay}>🪑 x{data.max_customer}</div>
      <button className={styles.statusButton}>
        {available ? `${data.table_id} - Open` : `${data.table_id} - Reserved`}
      </button>
    </div>
  );
}
