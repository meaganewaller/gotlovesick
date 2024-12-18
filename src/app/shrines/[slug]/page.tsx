import Image from 'next/image'

export function generateStaticParams() {
  const shrines = null

  if (!shrines) {
    return []
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Shrine({ params }: { params: { slug: string } }) {
  return (
    <div layout="lg-column" self="size-x1">
      <div self="size-x3 sm-first">
        <header className="mx-auto">
          <h1>Shrine Page</h1>
        </header>

      </div>
    </div>
  )
}


