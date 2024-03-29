import Header from "@/components/header";
import Floor from "@/components/floor";
import LoginForm from "@/components/loginform";
export default function Home() {
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
