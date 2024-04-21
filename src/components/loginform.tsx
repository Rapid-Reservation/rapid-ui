import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await login(username, password);
      // Redirect user to "/reserve" after successful login
      router.push("/reserve");
    } catch (error) {
      // @ts-ignore
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-gray-700 p-8 rounded-lg">
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
              className=" bg-slate-500 text-white"
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
              className="bg-slate-500 text-white"
            />
          </div>
          <br />
          <div className="flex justify-center">
            <button
              className="bg-white rounded-full px-4 py-2 shadow-md text-black"
              type="submit"
            >
              Sign in
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
  );
}
