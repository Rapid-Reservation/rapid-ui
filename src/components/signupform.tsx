import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  // const url = "https://rapid-api-rho.vercel.app"; //live version
  const url = "http://127.0.0.1:8000"; // localhost

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      // Send the first POST request to create the customer
      const response = await fetch(`${url}/customer/set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: name,
          customer_address: address,
          customer_phone: phone,
          customer_email: email,
        }),
      });

      // Check if the first POST request was successful
      if (response.ok) {
        // If successful, send another POST request to now make the user account
        const secondResponse = await fetch(`${url}/another/endpoint`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Add parameters for the second request here
          }),
        });

        // Check if the second POST request was successful
        if (secondResponse.ok) {
          alert("Account successfully created, rerouting to login page");
          router.push("/login");
        } else {
          throw new Error("Second request failed");
        }
      } else {
        throw new Error("First request failed");
      }
    } catch (error) {
      console.error("Error creating new user", error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-700 p-8 rounded-lg">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex justify-center">
              <label>Fill out the form below to create your account!</label>
            </div>
            <br />
            <div className="flex justify-center">
              <label htmlFor="username">Username: </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-black"
              />
            </div>
            <br />
            <div className="flex justify-center">
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black"
              />
            </div>
            <br />
            <div className="flex justify-center">
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-black"
              />
            </div>
            <br />
            <div className="flex justify-center">
              <label htmlFor="address">Address: </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-black"
              />
            </div>
            <br />
            <div className="flex justify-center">
              <label htmlFor="phone">Phone Number: </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-black"
              />
            </div>
            <br />
            <div className="flex justify-center">
              <label htmlFor="address">Email: </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black"
              />
            </div>
            <br />
            <div className="flex justify-center">
              <button
                className="bg-white rounded-full px-4 py-2 shadow-md text-black"
                type="submit"
              >
                Sign up
              </button>
            </div>
            {errorMessage && (
              <div className="flex justify-center mt-2 text-red-500">
                Error: {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
