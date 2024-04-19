import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";
import { useMutation } from "react-query";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  // Define a login mutation using React Query's useMutation hook
  const {
    mutate: loginMutation,
    isLoading,
    isError,
  } = useMutation(
    // Define the login function that will be called on mutation
    async (credentials) => {
      const response = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail);
      }

      return response.json();
    },
    {
      // Define the onSuccess callback to handle successful login
      onSuccess: (data) => {
        // Assuming the API returns an access token upon successful authentication
        const accessToken = data.access_token;

        // Call the login function to update authentication state
        login(accessToken);
        setErrorMessage("");

        // Redirect user to "/reserve" after successful login
        router.push("/reserve");
      },
    }
  );
  // @ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the loginMutation function with the username and password
    // @ts-ignore
    loginMutation({ username, password });
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <label>Enter your login details</label>
        </div>
        <br />
        <div>
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
        <div>
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
          <button
            className="bg-white rounded-full px-4 py-2 shadow-md text-black"
            type="submit"
            disabled={isLoading} // Disable the button while the mutation is loading
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </div>
        {isError && (
          <div className="flex justify-center mt-2 text-red-500">
            {/* @ts-ignore */}
            Error: {isError.message}
          </div>
        )}
      </form>
    </div>
  );
}
