import React from "react";
import { useQuery } from "react-query";
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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    AccordionActions
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderItemList from "./orderItemList";

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
    // interface FoodItem {
    //     food_id: number;
    //     quantity: number;
    //   }
    const testData: FoodItem[] = [{ food_id: 1, quantity: 2 }, { food_id: 4, quantity: 2 }, { food_id: 5, quantity: 2 }]
    const testData2: FoodItem[] = [{ food_id: 3, quantity: 2 }]

    return (
        <>
            <Container>
                <Typography variant="h3">Account Details</Typography>
                <Divider>Account Information</Divider>
                <Typography>Usernname: XXXXXXXX</Typography>
                <Typography>Field2: XXXXXXXX</Typography>
                <Divider>Current Orders</Divider>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Order 1 ({testData.length} {testData.length > 1 ? 'items' : 'item'})
                    </AccordionSummary>
                    <AccordionDetails>
                        <Divider textAlign="left">Table 1</Divider>
                        <OrderItemList foodItems={testData} foodData={foodData} />
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Order 2 ({testData2.length} {testData2.length > 1 ? 'items' : 'item'})
                    </AccordionSummary>
                    <AccordionDetails>
                        <Divider textAlign="left">Table 2</Divider>
                        <OrderItemList foodItems={testData2} foodData={foodData} />
                    </AccordionDetails>
                </Accordion>
                <Divider>Past Orders</Divider>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Order 2 ({testData2.length} {testData2.length > 1 ? 'items' : 'item'})
                    </AccordionSummary>
                    <AccordionDetails>
                        <OrderItemList foodItems={testData2} foodData={foodData} />
                    </AccordionDetails>
                </Accordion>
            </Container>
        </>
    );
}
