import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between bg-gray-700 p-1">
        <div className="mr-6 flex flex-shrink-0 items-center text-white">
          <Image
            className="rounded-md p-2"
            src="/rapidreservation.png"
            width={56}
            height={56}
            alt="Rapid Reservation Logo"
          />
          <span className="text-2xl font-semibold tracking-tight">
            Rapid Reservation
          </span>
        </div>
        <div className="block lg:hidden">
          <button className="flex items-center rounded border border-teal-400 px-3 py-2 text-teal-200 hover:border-white hover:text-white">
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
          <div className="text-sm lg:flex-grow">
            <Link
              href="/reserve"
              className="mr-4 mt-4 block text-lg text-white hover:text-white lg:mt-0 lg:inline-block"
            >
              Home
            </Link>
            <Link
              href="/reserve"
              className="mr-4 mt-4 block text-lg text-white hover:text-white lg:mt-0 lg:inline-block"
            >
              Reservations
            </Link>
            <Link
              href="/login"
              className="mr-4 mt-4 block text-lg text-white hover:text-white lg:mt-0 lg:inline-block"
            >
              Login
            </Link>
            <Link
              href="/menu"
              className="mr-4 mt-4 block text-lg text-white hover:text-white lg:mt-0 lg:inline-block"
            >
              Menu
            </Link>
          </div>
          <div>
            <Link
              href="/menu"
              className="inline-block rounded-full border-white px-4 px-4 py-2 py-2 text-sm font-bold leading-none text-white text-white hover:border-transparent hover:bg-blue-700 hover:text-teal-500"
            >
              <Image
                className="rounded-full"
                src="/checkout-cart-icon-16.png"
                width={40}
                height={40}
                alt="View your checkout cart"
              />
            </Link>
          </div>
          <div>
            <Link
              href="https://github.com/Rapid-Reservation"
              className="inline-block rounded-full border-white px-4 px-4 py-2 py-2 text-sm font-bold leading-none text-white text-white hover:border-transparent hover:bg-blue-700 hover:text-teal-500"
            >
              <Image
                className="rounded-full"
                src="/github-mark.png"
                width={40}
                height={40}
                alt="Link to Rapid Reservation GitHub org"
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
