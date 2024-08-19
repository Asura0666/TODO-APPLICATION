import Image from "next/image";
import Link from "next/link";

function NavBar() {
  return (
    <div className=" w-full flex flex-col md:flex-row items-center justify-between text-white px-7 py-1 font-bold border-b border-solid border-zinc-100 leading-[154.5%]">
      {/* Logo and Branding */}
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-1 rounded-lg m-2">
          <p className="text-lg font-semibold">To</p>
          <Image
            src="/fuzzieLogo.png"
            width={10}
            height={10}
            alt="todo logo"
            className="shadow-sm"
          />
          <p className="text-lg font-semibold">Do</p>
        </Link>
      </div>

      {/* Navigation Links and Button */}
      <div className="flex flex-row items-center gap-5 mt-2 md:mt-0">
        <ul className="flex flex-row gap-5 text-sm leading-5 !dark:text-neutral-700 font-normal">
          <li>
            <Link href="/pricing">Pricing</Link>
          </li>
          <li>
            <Link href="/news">News Room</Link>
          </li>
          <li>
            <Link href="/features">Features</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
        <Link
          href="/dashboard"
          className="bg-orange px-4 py-2 rounded-sm text-white text-center"
        >
          Free Trial
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
