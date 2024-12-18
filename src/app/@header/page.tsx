import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import getHeaderMenuById from "@/lib/queries/getHeaderMenuById"
import logo from '@/assets/images/logo.png'

/**
 * Header component.
 */
export default async function Header() {
  const menu = await getHeaderMenuById("dGVybTo0");

  return (
    <div layout="rows md-columns md-stretch-spread sm-center">
      <div self="sm-full" className="sm:mx-auto">
        <Link href="/">
          <Image src={logo} alt="Secret Gardens Logo" width={373} height={174} />
        </Link>
      </div>
      <div self="sm-full">
        <ScrollArea>
          <nav className="flex md:justify-end sm:justify-center gap-4">
            {!!menu &&
              menu.menuItems.edges.map((item) => (
                <Link
                  key={item.node.databaseId}
                  href={item.node.uri}
                  className="font-cute border-2 rounded-md border-raspberry-pink py-1.5 px-2 text-raspberry-pink bg-light-peach text-xl hover:bg-opacity-8"
                >
                  {item.node.label}
                </Link>
              ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}

