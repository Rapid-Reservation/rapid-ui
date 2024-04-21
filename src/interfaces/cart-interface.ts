//We essentially use TS Interfaces to create "types"

interface CartData {
  customer_id: number | null;
  table_number: number | null;
  items: FoodItem[] | null;
}
