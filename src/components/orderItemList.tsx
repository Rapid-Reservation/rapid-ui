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

export default function OrderItemList(
    { foodItems, foodData }: { foodItems: FoodItem[], foodData: { name: string, price: number }[] }) {

    return (
        <>
            <List dense={true}>
                {foodItems.map((foodItem: FoodItem, index: number) => {
                    return (
                        <ListItem key={index}>
                            <ListItemIcon>-</ListItemIcon>
                            <ListItemText
                                primary={`${foodData[foodItem.food_id - 1].name} (${foodItem.quantity
                                    })`}
                                secondary={`$${foodData[foodItem.food_id - 1].price}`}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </>
    )

}
