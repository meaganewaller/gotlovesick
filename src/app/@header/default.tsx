import Link from "next/link";
import HeaderTitle from "@/components/HeaderTitle";

/**
 * Header component.
 */
export default function Header() {

  return (
    <header id="header">
      <div className='header-title'>
        <Link href="/" className="">
          <HeaderTitle />
        </Link>
      </div>
    </header>
  )
}

