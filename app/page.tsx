import NavBar from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
   <main suppressHydrationWarning className="flex overflow-x-hidden items-center justify-center flex-col">
    <NavBar/>
   </main>
  );
}
