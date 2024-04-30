import React, { useState, useEffect } from "react";
import Table from "./table";

export default function Floor() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //const url = "http://127.0.0.1:8000/table"; //localhost
  const url = "https://rapid-api-rho.vercel.app"; //live

  // Use useEffect hook to fetch data
  useEffect(() => {
    const url = "http://127.0.0.1:8000/table";
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        //@ts-ignore
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();

    // Clean up function to cancel fetch if component unmounts
    return () => {};
  }, []);

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle error state
  //@ts-ignore
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map((table, index) => (
        <Table key={index} data={table} />
      ))}
    </div>
  );
}
