import React from "react";
import { useQuery } from "react-query";
import Table from "./table";

export default function Floor() {
  // Use useQuery hook to fetch data
  const { data, isLoading, isError, error } = useQuery("tables", fetchTables);

  // Function to fetch table data
  async function fetchTables() {
    try {
      const res = await fetch("https://rapid-api-rho.vercel.app/table");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    } catch (error) {
      throw new Error("Error fetching table data:", error);
    }
  }

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error state
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((table: TableData, index: React.Key | null | undefined) => (
        <Table key={index} data={table} />
      ))}
    </div>
  );
}
