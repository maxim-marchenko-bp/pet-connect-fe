import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";


export const Header = () => {
  return (
    <header className="bg-orange-400 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex pt-3 pb-3 items-center justify-between">
        <Image
          src='/images/logo-text.png'
          alt='logo'
          width={300}
          height={30}
        />

        <div className="flex items-center justify-between">
          <UserCircleIcon width={24} height={24}></UserCircleIcon>
          <span>Login</span>
        </div>
      </div>
    </header>
  )
}
