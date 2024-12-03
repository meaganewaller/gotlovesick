import Link from "next/link";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import getHeaderMenuById from "@/lib/queries/getHeaderMenuById"
import logo from '~/logo.png'

/**
 * Header component.
 */
export default async function Header() {
  const menu = await getHeaderMenuById("dGVybTo0");

  return (
    <div layout="row md-column center-justify">
      <div self="md-half sm-full">
        <Link href="/">
          <Image src={logo} alt="Secret Gardens Logo" width={373} height={174} />
        </Link>
      </div>
      <div self="md-half sm-full">
        <ScrollArea>
          <nav className="flex justify-between gap-4">
            {!!menu &&
              menu.menuItems.edges.map((item) => (
                <Link
                  key={item.node.databaseId}
                  href={item.node.uri}
                  className="font-sans uppercase"
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
