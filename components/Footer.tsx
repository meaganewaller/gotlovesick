/**
 * Footer component.
 */
export default function Footer() {
  return (
    <footer className="text-sm text-center inline-flex">
      &copy; 2022-{new Date().getFullYear()} - brought to you by{' '}
      <a
        href="https://meaganwaller.com"
        className="ml-1 border-b-solid border-purple-500 border-b-2 italic"
      >
        Meagan Waller
      </a>
    </footer>
  )
}
