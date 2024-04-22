//We essentially use TS Interfaces to create "types"

interface Order {
    order_id: number;
    customer_id: number;
    table_number: number | null;
    items: FoodItem[];
  }
  