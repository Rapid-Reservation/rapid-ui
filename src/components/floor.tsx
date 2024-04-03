import React, { useState, useEffect } from "react";
import Table from "./table";

export default function Floor() {
  // Array that will hold our TableData returned by API
  const [tables, setTables] = useState<TableData[]>([]);
  const url = "https://rapid-api-rho.vercel.app";
  //const url = "http://127.0.0.1:8000";

  // Use UseEffect hook to call asynchronus function fetchTableData. Hits get table endpoint
  useEffect(() => {
    async function fetchTableData() {
      try {
        const res = await fetch(`${url}/table`);
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

  return (
    <div>
      {tables.map(
        (
          table,
          index //map over the contents of the tables stateful variable, create a Table component per index in Tables
        ) => (
          <Table key={index} data={table} />
        )
      )}
    </div>
  );
}
