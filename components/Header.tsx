import Image from 'next/image'
import logo from '@/public/logo.png'

/**
 * Header component.
 */
export default function Header() {
  return (
    <header>
      <Image src={logo} alt="Secret Gardens Logo" width={373} height={174} />
    </header>
  )
}
