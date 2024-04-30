import { useState } from "react";
// import styles from "./menu.module.css";
import {
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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import CircleIcon from "@mui/icons-material/Circle";

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

// Taken from https://mui.com/material-ui/react-tabs/#introduction
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Taken from https://mui.com/material-ui/react-tabs/#introduction
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Taken from https://mui.com/material-ui/react-tabs/#introduction
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Menu({
  tableID,
  handleClose,
  handleReserve,
}: {
  tableID: number;
  handleClose: () => void;
  handleReserve: () => Promise<void>;
}) {
  const [cartItems, setCartItems] = useState<FoodItem[]>([]);
  const [tabvalue, settabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    settabValue(newValue);
  };

  const addCartItem = (itemID: number) => {
    let newCartItems = cartItems.slice();
    const cartItemIDs = cartItems.map((foodItem) => foodItem.food_id);
    const itemIndex = cartItemIDs.indexOf(itemID);

    if (itemIndex >= 0) {
      newCartItems[itemIndex].quantity += 1;
    } else {
      newCartItems.push({
        food_id: itemID,
        quantity: 1,
      });
    }

    setCartItems(newCartItems);
  };

  const handleSubmitCart = async () => {
    try {
      // Run the setReservation function
      await submitCart();

      // Close the modal after reservation
      handleClose();

      // reserve the table
      handleReserve();
    } catch (error) {
      console.error("Error reserving table:", error);
    }
  };

  const submitCart = async () => {
    try {
      // Format data to POST
      const orderData: CartData = {
        customer_id: 1, // currently set to 1 for admin as the id
        table_number: tableID,
        items: cartItems,
      };

      const url = "https://rapid-api-rho.vercel.app";
      const endpoint = url + "/order/place";

      // Send a POST request to the determined endpoint to update the availability state
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
    } catch (error) {
      console.error("Error updating table availability:", error);
    }
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabvalue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Menu" {...a11yProps(0)} />
          <Tab label={`Cart (${cartItems.length})`} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={tabvalue} index={0}>
        <Divider>Apps</Divider>
        <Container sx={{ mb: 2 }}>
          <Button
            onClick={() => {
              addCartItem(4);
            }}
            size="small"
            endIcon={<AddIcon />}
          >
            Cornish Pasties
          </Button>
          <Button
            onClick={() => {
              addCartItem(5);
            }}
            size="small"
            endIcon={<AddIcon />}
          >
            Roasted Beet Salad
          </Button>
        </Container>
        <Divider>Meals</Divider>
        <Container sx={{ mb: 2 }}>
          <Button
            onClick={() => {
              addCartItem(1);
            }}
            size="small"
            endIcon={<AddIcon />}
          >
            Pizza
          </Button>
          <Button
            onClick={() => {
              addCartItem(2);
            }}
            size="small"
            endIcon={<AddIcon />}
          >
            Cheeseburger
          </Button>
          <Button
            onClick={() => {
              addCartItem(3);
            }}
            size="small"
            endIcon={<AddIcon />}
          >
            Salad
          </Button>
        </Container>
        <Divider>Drinks</Divider>
        <Container sx={{ mb: 2 }}>
          <Button
            onClick={() => {
              addCartItem(6);
            }}
            size="small"
            endIcon={<AddIcon />}
          >
            Water
          </Button>
          <Button
            onClick={() => {
              addCartItem(7);
            }}
            size="small"
            endIcon={<AddIcon />}
          >
            Fountain Drink
          </Button>
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={tabvalue} index={1}>
        <List dense={true}>
          {cartItems.map((foodItem: FoodItem, index: number) => {
            return (
              <ListItem key={index}>
                <ListItemIcon>-</ListItemIcon>
                <ListItemText
                  primary={`${foodData[foodItem.food_id - 1].name} (${
                    foodItem.quantity
                  })`}
                  secondary={`$${foodData[foodItem.food_id - 1].price}`}
                />
              </ListItem>
            );
          })}
        </List>
        <Divider textAlign="left" sx={{ mb: 2 }}>
          Total
        </Divider>
        <Typography textAlign="center">{`$${cartItems
          .reduce(
            (partialSum, foodItem: FoodItem) =>
              partialSum +
              foodItem.quantity * foodData[foodItem.food_id - 1].price,
            0
          )
          .toFixed(2)}`}</Typography>
      </CustomTabPanel>
      <Container>
        <Button onClick={handleClose} variant="outlined" sx={{ m: 2 }}>
          Close
        </Button>
        <Tooltip
          title={
            <Typography>
              Submitting your order will reserve the table for you.
            </Typography>
          }
        >
          <Button
            onClick={handleSubmitCart}
            variant="contained"
            sx={{ m: 2 }}
            color="success"
            endIcon={<SendIcon />}
          >
            Submit
          </Button>
        </Tooltip>
      </Container>
    </>
  );
}
