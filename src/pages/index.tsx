import LoginForm from "@/components/loginform";
import { AuthProvider } from "@/context/authContext";
import backgroundImage from "../../public/stock-background.jpg";

export default function HomePage() {
  let users = new Map();
  users.set("admin", "pass");

  return (
    <>
      <div className="text-center bg-black-500/50 mt-16 md:mt-32">
        {" "}
        {/* Adjust margin top for smaller devices */}
        <h1 className="text-lg font-bold tracking-tight text-white-900 sm:text-3xl">
          Hungry now? Order at ease with Rapid Reservation!
        </h1>
        <p className="mt-6 text-lg leading-8 text-white-600">
          Pick your seat, then pick your food. It's that simple!
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-white-900"
          >
            Login <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </>
  );
}
