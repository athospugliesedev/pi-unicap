import Image from "next/image"
import LogoUnicap from "../assets/logo-branca-unicap 1.png"
import { House, Bell, Info, ChartPieSlice, GearSix, SignOut } from "@phosphor-icons/react";
import Link from "next/link";


export default function Sidebar() {
  return (
    <aside
      className="
      flex flex-col items-center bg-default min-h-screen  shrink-0 w-[224px]
      max-sm:hidden
      "
    >
      <div className="flex justify-center m-2 mb-4">
        <Image src={LogoUnicap} alt="Logo unicap" />
      </div>

      <nav className="flex flex-col justify-center items-center space-y-6 mb-80">
        <Link href="/dashboard" className="flex bg-default w-20 h-20 focus:ring focus:ring-white justify-center items-center rounded-md">
          <House className="text-white focus:text-default" size={32} />

        </Link>

        <Link href="/dashboard/chat" className="flex bg-default w-20 h-20 focus:ring focus:ring-white hover:bg-default/40 justify-center items-center rounded-md">
          <Info className="text-white" size={32} />

        </Link>
        <Link href="/dashboard/review" className="flex bg-default w-20 h-20 focus:ring focus:ring-white hover:bg-default/40 justify-center items-center rounded-md">
          <ChartPieSlice className="text-white" size={32} />

        </Link>



      </nav>
      <div className="flex flex-col justify-end space-y-2">
        <Link href="home" className="">
          <GearSix className="text-white" size={32} />

        </Link>
        <Link href="home" className="">
          <SignOut className="text-white" size={32} />

        </Link>
      </div>
    </aside>
  );
}