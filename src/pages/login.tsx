import LoginForm from "@/components/loginform";
import { AuthProvider } from "@/context/authContext";
export default function Login() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <LoginForm />
      </div>
    </>
  );
}
