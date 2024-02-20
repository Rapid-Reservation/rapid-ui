import Image from "next/image";
import { Inter } from "next/font/google";
import TableTester from "@/components/table-tester";
import Header from "@/components/header";
import Floor from "@/components/floor";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header />
      {/* <TableTester numTables={10} /> */}
      <Floor />
    </>
  ); // currently demonstrating Table component
}
