import React, { useState, useEffect } from "react";
import Table from "./table";

export default function Floor() {
  // Array that will hold our TableData returned by API
  const [tables, setTables] = useState<TableData[]>([]);

  // Use UseEffect hook to call asynchronus function fetchTableData. Hits get table endpoint
  useEffect(() => {
    async function fetchTableData() {
      try {
        const res = await fetch("http://127.0.0.1:5000/table");
        if (!res.ok) {
          throw new Error("Failed to fetch data"); //throw and error if we do not get an "OK" response
        }

        // takes returned data and adds to an array of TableData , then set
        const data: TableData[] = await res.json();
        setTables(data); // use the useState hook to set value of stateful variable `tables` with the values from returned `data`
      } catch (error) {
        console.error("Error fetching table data:", error); //throw an error if we dont get table back
      }
    }

    fetchTableData();
  }, []); // empty depenency array, might update to possibly trigger re render on a determined statechange? talk to will about

  useEffect(() => {
    const tableSocket = new WebSocket(
      'ws://127.0.0.1:5000/ws/tables/'
    );

    tableSocket.onmessage = function(e) {
      const data: TableData[] = JSON.parse(e.data);
      let new_tables = tables.slice()
      new_tables.length = 0;
      for (let table of data) {
        new_tables.push(table);
      }
      console.log('new table data');
      console.log(new_tables);
      setTables(new_tables);
    };

    tableSocket.onclose = function(e) {
      console.log('table websocket closed.');
    };

    return () => {
      tableSocket.close();
    }
  }, [])

  const handleTableClick = async (index: number) => {
    try {
      // Toggle the state
      let newTables = tables.slice();
      newTables[index].table_available = !newTables[index].table_available;
      // console.log(`table ${index} was clicked. it was available: ${tables[index].table_available} and is now ${newTables[index].table_available}`)
      // console.log(tables);
      // console.log(newTables);
      setTables(newTables);

      // Determine the endpoint based on the current availability
      const endpoint = newTables[index].table_available
        ? `http://127.0.0.1:5000/table/clear/${newTables[index].table_id}`
        : `http://127.0.0.1:5000/table/set/${newTables[index].table_id}`;

      // Send a POST request to the determined endpoint to update the availability state
      await fetch(endpoint, {
        method: "POST",
      });
    } catch (error) {
      console.error("Error updating table availability:", error);
    }
  };

  return (
    <div>
      {tables.map(
        (
          table,
          index //map over the contents of the tables stateful variable, create a Table component per index in Tables
        ) => (
          <Table key={index} index={index} data={table} handleClick={handleTableClick} />
        )
      )}
    </div>
  );
}
