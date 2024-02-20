import React, { useState, useEffect } from "react";
import Table from "./table";

export default function Floor() {
  const [tables, setTables] = useState<TableData[]>([]);

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
      {tables.map((table, index) => (
        <Table
          key={index}
          table_id={table.table_id} // Use table_id instead of table_num
          table_available={table.table_available} // Use table_available instead of reserved
          max_customer={table.max_customer} // Use max_customer instead of max_seating
          order_id={table.order_id} // Use order_id instead of order_number
        />
      ))}
    </div>
  );
}
