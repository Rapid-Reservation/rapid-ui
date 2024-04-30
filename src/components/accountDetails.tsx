import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  Alert,
  Button,
  Divider,
  Stack,
  Container,
  Drawer,
  Popover,
  Box,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
import OrderItemList from "./orderItemList";
import AccountFields from "./accountFields";
import { useAuth } from "@/context/authContext";

// can be replaced with a call to the database if an endpoint is implemented
const foodData = [
  {
    name: "Pizza",
    price: 7.99,
  },
  {
    name: "Cheeseburger",
    price: 4.99,
  },
  {
    name: "Salad",
    price: 3.99,
  },
  {
    name: "Cornish Pasties",
    price: 4.99,
  },
  {
    name: "Roasted Beet Salad",
    price: 4.99,
  },
  {
    name: "Water",
    price: 1.99,
  },
  {
    name: "Fountain Drink",
    price: 2.99,
  },
];

export default function AccountDetails() {
  const { isAdmin, userId, userName, isLoggedIn, logout } = useAuth();
  const { data, isLoading, isError, error } = useQuery("tables", fetchOrders);
  // const [orders, setOrders] = useState<Order[]>([]);
  const ordersURL = "https://rapid-api-rho.vercel.app/orders"; //live api
  //const ordersURL = "http://127.0.0.1:8000/orders"; //live api

  async function fetchOrders() {
    try {
      const res = await fetch(ordersURL);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      return res.json();
    } catch (error) {
      // @ts-ignore
      throw new Error("Error fetching order data:", error);
    }
  }

  // Handle loading state
  if (isLoading || !data)
    return (
      <Typography align="center" variant="h3">
        <CircularProgress /> Loading...
      </Typography>
    );

  // Handle error state
  if (isError)
    return (
      <Alert severity="error">
        There was an error loading account data:
        <Divider sx={{ mb: 2, mt: 2 }}></Divider>
        <code>
          {
            // @ts-ignore
            error.message
          }
        </code>
      </Alert>
    );

  const currentOrders: Order[] = data.filter((value: Order) => {
    return value.customer_id == userId && value.table_number != null;
  });
  const pastOrders: Order[] = data.filter((value: Order) => {
    return value.customer_id == userId && value.table_number == null;
  });

  return (
    <>
      <Container>
        <Typography variant="h3">Account Details</Typography>
        <Divider>Account Information</Divider>
        <AccountFields />
        <Divider>Current Orders</Divider>
        {currentOrders.map((order: Order) => {
          return (
            <Accordion key={order.order_id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Order {order.order_id}</Typography>
                <Typography sx={{ right: 0, position: "absolute", mr: 5 }}>
                  ({order.items.length}){" "}
                  {order.items.length > 1 ? "items" : "item"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Divider textAlign="left">Table {order.table_number}</Divider>
                <OrderItemList foodItems={order.items} foodData={foodData} />
              </AccordionDetails>
            </Accordion>
          );
        })}
        <Divider>Past Orders</Divider>
        {pastOrders.map((order: Order) => {
          return (
            <Accordion key={order.order_id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>Order {order.order_id}</Typography>
                <Typography
                  sx={{
                    right: 0,
                    position: "absolute",
                    transform: "translate(-100%)",
                  }}
                >
                  ({order.items.length}){" "}
                  {order.items.length > 1 ? "items" : "item"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <OrderItemList foodItems={order.items} foodData={foodData} />
              </AccordionDetails>
            </Accordion>
          );
        }) || <Typography>No Current Orders!</Typography>}
      </Container>
    </>
  );
}
