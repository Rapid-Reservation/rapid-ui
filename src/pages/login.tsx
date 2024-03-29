import Header from "@/components/header";
import Floor from "@/components/floor";
import LoginForm from "@/components/loginform";
import { AuthProvider } from "@/context/authContext";
export default function Login() {
  let users = new Map();
  users.set("admin", "pass");

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <LoginForm usersDb={users} />
      </div>
    </>
  );
}
