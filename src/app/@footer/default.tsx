import AccessCounter from '@/components/AccessCounter'

export default function Footer() {
  return (
    <>
      <div layout="rows-justify">
        <hr className="border-t-2 border-lime-500 w-full border-dashed" />
        <div self="full">
          <footer className="text-sm text-center inline-flex">
            &copy; 2024-{new Date().getFullYear()} - brought to you by{' '}
            <a
              href="https://meaganwaller.com"
              className="ml-1 border-b-solid border-purple-500 border-b-2 italic"
            >
              Meagan Waller
            </a>
          </footer>
        </div>
        <div self="full">
          <AccessCounter />
        </div>
      </div>
    </>
  )
}
