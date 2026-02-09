import Image from "next/image";
import { HeaderUserMenu } from "@/components/header-user-menu/header-user-menu";


export function Header() {
  return (
    <header className="bg-orange-400 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex pt-3 pb-3 items-center justify-between">
        <Image
          src='/images/logo-text.png'
          alt='logo'
          width={300}
          height={30}
        />

        <HeaderUserMenu/>
      </div>
    </header>
  )
}
