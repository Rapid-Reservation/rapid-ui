import React from "react";
import { useQuery } from "react-query";
import Table from "./table";

export default function Floor() {
  const url = "https://rapid-api-rho.vercel.app/table"; //live api url
  //const url = "http://127.0.0.1:8000"; localhost url
  const { data, isLoading, isError, error } = useQuery("tables", fetchTables);

  // Function to fetch table data from database
  async function fetchTables() {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    } catch (error) {
      // @ts-ignore
      throw new Error("Error fetching table data:", error);
    }
  }

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error state
  // @ts-ignore
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((table: TableData, index: React.Key | null | undefined) => (
        <Table key={index} data={table} />
      ))}
    </div>
  );
}
