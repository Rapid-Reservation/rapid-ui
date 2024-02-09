import Image from "next/image";
import { Inter } from "next/font/google";
import TableTester from "@/components/table-tester";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <TableTester numTables={10}/>; // currently demonstrating Table component
}
