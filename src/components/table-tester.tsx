import Table from "./table";
import { useState } from 'react';

//@ts-ignore
export default function TableTester({ numTables}) {
    const [tablesReserved, setTablesReserved] = useState(Array(numTables).fill(false));
    const [tablesPartyNames, setTablesPartyNames] = useState(Array(numTables).fill(null).map((e, index) => `Party ${index}`));
    const [tablesNumSeats, setTablesNumSeats] = useState(Array(numTables).fill(null).map((e, index) => index % 2 == 0 ? 4 : 5));
    const [tablesOrders, setTablesOrders] = useState(Array(numTables).fill(['Menu item 1', 'Menu item 2']));

    // currently just inverts the reserved value
    function handleTableClick(i: number) {
        if (i > numTables - 1) {return;}

        const newTablesReserved = tablesReserved.slice();
        newTablesReserved[i] = !newTablesReserved[i];
        setTablesReserved(newTablesReserved);

        console.log(
            `Table\n` +
            `------\n` +
            `ID: ${i}\n` +
            `Is Reserved: ${newTablesReserved[i]}\n` +
            `Party Name: ${tablesPartyNames[i]}\n` +
            `# Seats: ${tablesNumSeats[i]}\n` +
            `Orders: ${JSON.stringify(tablesOrders[i])}`
        )
    }

    // create an array of jsx elements
    // for dynamic number of tables
    let tablesJSX = [];
    for (let i = 0; i < numTables; i++) {
        tablesJSX.push(
            <Table
                id={i}
                isReserved={tablesReserved[i]}
                partyName={tablesPartyNames[i]}
                numSeats={tablesNumSeats[i]}
                order={tablesOrders[i]}
                onTableClick={() => {handleTableClick(i)}}
            />
        )
    }

    // spread the array of jsx elements
    return <>{...tablesJSX}</>;
  }
  