import React, { useState, useEffect } from "react";
import Table from "./table";

export default function Floor() {
  const [tables, setTables] = useState<TableData[]>([]);


  // Here, we use a useEffect hook to fetch data from API. We then store the respone in an array of type TableData

  useEffect(() => {
    async function fetchTableData() {
      try {
        const res = await fetch("http://127.0.0.1:5000/table");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: TableData[] = await res.json();
        setTables(data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    }

    fetchTableData();
  }, []);

  return (
    <div>
      {tables.map(
        (
          table,
          index //Here we map over the array of TableData and map each tables value to the data.value per map loop.
        ) => (
          <Table
            key={index}
            table_id={table.table_id}
            table_available={table.table_available}
            max_customer={table.max_customer}
            order_id={table.order_id}
          />
        )
      )}

    </div>
  );
}
