import Link from "next/link";
import { PhoneCallIcon } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import DashboardBtn from "./DashboardBtn";

function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* LEFT SIDE - LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-sans hover:opacity-80 transition-opacity"
        >
          <PhoneCallIcon className="size-8 text-indigo-500" />
          <span className="bg-gradient-to-r from-indigo-500 to-blue-400 bg-clip-text text-transparent">
            ProCall
          </span>
        </Link>

        {/* RIGHT SIDE - ACTIONS */}
        <SignedIn>
          <div className="flex items-center space-x-5 ml-auto">
            <DashboardBtn />
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}
export default Navbar;
