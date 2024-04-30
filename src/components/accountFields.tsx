import React from "react";
import { useQuery } from "react-query";
import {
    Alert,
    Divider,
    Typography,
    CircularProgress
} from "@mui/material";
import { useAuth } from "@/context/authContext";

export default function AccountFields() {
    const { isAdmin, userId, userName, isLoggedIn, logout } = useAuth();
    const { data, isLoading, isError, error } = useQuery("customers", fetchCustomers);
    const customersURL = `https://rapid-api-rho.vercel.app/customer/${userId}`; //live api

    async function fetchCustomers() {
        try {
            const res = await fetch(customersURL);
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            return res.json();
        } catch (error) {
            // @ts-ignore
            throw new Error("Error fetching account data:", error);
        }
    }

    // Handle loading state
    if (isLoading) return <Typography align="center" variant="h3"><CircularProgress /> Loading...</Typography>;

    // Handle error state
    if (isError) return (
        <Alert severity="error">
            There was an error loading account data:
            <Divider sx={{ mb: 2, mt: 2 }}></Divider>
            <code>{
                // @ts-ignore
                error.message
            }</code>
        </Alert>
    );

    const customerData: {
        customer_id: number,
        customer_name: string,
        customer_address: string,
        customer_phone: string,
        customer_email: string
    } = data[0]

    return (
        <>
            <Typography>ID: {userId}</Typography>
            <Typography>Username: {userName}</Typography>
            <Typography>Name: {customerData.customer_name}</Typography>
            <Typography>Address: {customerData.customer_address}</Typography>
            <Typography>Phone: {customerData.customer_phone}</Typography>
            <Typography>Email: {customerData.customer_email}</Typography>
            <Typography>Is an Admin?: {isAdmin ? 'Yes': 'No'}</Typography>
        </>
    );
}
