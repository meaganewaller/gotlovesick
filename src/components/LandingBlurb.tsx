import Link from "next/link"

export default function LandingBlurb() {
  return (
    <div layout="row center-center">
      <p className='pt-4 pr-0 pb-4 pl-0 text-4xl font-cute mx-auto max-w-[80%] text-center'>
        On this website, I keep a{' '}
        <Link className='p-1 -m-1 text-deep-green font-bold hover:bg-deep-green hover:text-creamy-white' href="/blog">weblog</Link>,{' '}
        my <Link className='p-1 -m-1 text-deep-pink font-bold hover:bg-deep-pink hover:text-creamy-white' href='/projects'>projects</Link>,{' '}
        <Link className='p-1 -m-1 text-deep-purple font-bold hover:bg-deep-purple hover:text-creamy-white' href='/bookmarks'>bookmarks</Link>,{' '}
        & <Link className='p-1 -m-1 text-deep-sky-blue font-bold hover:bg-deep-sky-blue hover:text-creamy-white' href="/shrines">shrines</Link>
      </p>
    </div>

  )
}
