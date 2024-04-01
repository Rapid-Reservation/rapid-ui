import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";

export default function LoginForm({
  usersDb,
}: {
  usersDb: Map<string, string>;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login } = useAuth();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(
      "Form submitted with username:",
      username,
      "and password:",
      password
    );

    // Check if username and password match
    if (usersDb.get(username) === password) {
      // Call login function to update authentication state
      login();

      // Redirect user to "/reserve" after successful login
      router.push("/reserve");
    } else {
      console.log("Incorrect username or password");
    }
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
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
