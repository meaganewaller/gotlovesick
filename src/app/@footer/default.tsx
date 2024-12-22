import AccessCounter from '@/components/AccessCounter'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <p>
        &copy; 2024-{new Date().getFullYear()} - brought to you by{' '}
        <Link href="https://meaganwaller.com" className="">
          Meagan Waller
        </Link>
      </p>
      <AccessCounter />
    </footer>
  )
}


