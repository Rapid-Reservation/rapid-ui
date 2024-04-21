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
        const res = await fetch(`${url}/customer/id/${email}`);

        // Check if the second POST request was successful
        if (res.ok) {
          const data = await res.json();
          //console.log(data[0].user_id);
          const id = data[0].user_id;

          const new_user = await fetch(`${url}/users/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: id,
              user_name: username,
              password: password,
              isadmin: false,
            }),
          });

          if (new_user.ok) {
            router.push(`/login`);
            return "User successfully created!";
          }
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
            <div className="flex justify-center mb-6">
              <label className="block text-white font-bold mb-2">
                Fill out the form below to create your account!
              </label>
            </div>
            <div className="mb-6">
              <label
                htmlFor="username"
                className="block text-white font-bold mb-2"
              >
                Username:{" "}
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-black px-3 py-2 border rounded-md w-full h-8"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-white font-bold mb-2"
              >
                Password:{" "}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-black px-3 py-2 border rounded-md w-full h-8"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="name" className="block text-white font-bold mb-2">
                Name:{" "}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-black px-3 py-2 border rounded-md w-full h-8"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-white font-bold mb-2"
              >
                Address:{" "}
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-black px-3 py-2 border rounded-md w-full h-8"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="phone">Phone Number: </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-black px-3 py-2 border rounded-md w-full h-8"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="address"
                className="block text-white font-bold mb-2"
              >
                Email:{" "}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-black px-3 py-2 border rounded-md w-full h-8"
              />
            </div>
            <div className="mb-6">
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
