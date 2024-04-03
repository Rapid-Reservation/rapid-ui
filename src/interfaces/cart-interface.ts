//We essentially use TS Interfaces to create "types"

interface CartData {
  customer_id: number | null;
  total_price: number | null;
  table_id: number | null;
  items: String[] | null;
}
