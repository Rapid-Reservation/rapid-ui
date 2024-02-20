import Image from "next/image";
import { Inter } from "next/font/google";

import Floor from "@/components/floor";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      <Floor />
    </>
  ); /
}
