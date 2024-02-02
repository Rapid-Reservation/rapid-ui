import Table from "./table";
import { useState } from 'react';

//@ts-ignore
export default function TableTester({ numTables}) {
    const [tables, setTables] = useState(Array(numTables).fill(false));

    // currently just inverts the value
    function handleTableClick(i: number) {
        if (i > numTables - 1) {return;}

        const newTables = tables.slice();
        newTables[i] = !newTables[i]
        setTables(newTables);
    }

    // create an array of jsx elements
    // for dynamic number of tables
    let tablesJSX = [];
    for (let i = 0; i < numTables; i++) {
        tablesJSX.push(<Table numChairs={i+1} isReserved={tables[i]} onTableClick={() => {handleTableClick(i)}}/>)
    }

    // spread the array of jsx elements
    return <>{...tablesJSX}</>;
  }
  