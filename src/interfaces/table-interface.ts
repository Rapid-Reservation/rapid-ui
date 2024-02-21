//We essentially use TS Interfaces to create "types"

// This is the "type" TableData that is returned from the API. This is also what we use to pass into a table component

interface TableData {
  max_customer: number;
  order_id: number | null;
  table_available: boolean;
  table_id: number;
}
