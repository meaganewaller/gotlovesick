import Link from 'next/link'
import bow from '@/public/images/bow.gif'
import Image from 'next/image'
import getAllLogs from '@/lib/queries/getAllLogs'
import { Log } from '@/lib/types'

export default async function UpdateLog() {
  const logs = await getAllLogs()

  if (!logs || !logs.length) {
    return (
      <nav className="py-4 px-0 select-none" id="update-log">
        <span className="text-center text-xl leading-6 text-rose-600 w-full flex font-pixel justify-center gap-1">
          <Image src={bow} alt="" width={22} height={13} />
          Update Log
          <Image src={bow} alt="" width={22} height={13} />
        </span>
        <p>no update logs found</p>
      </nav>
    )
  }

  return (
    <nav
      className="p-4 select-none border-solid border-lime-500 bg-lime-50 rounded-xl min-h-[50vh] border-2 overflow-scroll"
      id="update-log"
    >
      <span className="text-center text-xl leading-6 text-rose-600 w-full flex font-pixel justify-center gap-1 mb-5">
        <Image src={bow} alt="" />
        Updates
        <Image src={bow} alt="" />
      </span>
      {logs.map((log: Log) => (
        <article
          key={log.databaseId}
          className="leading-6 flex flex-col justify-center gap-1 border-lime-200 border-b-2 border-dashed pb-5 pt-2"
        >
          <h2
            dangerouslySetInnerHTML={{ __html: log.title }}
            className="!p-0 !mx-0 mb-3 text-sm uppercase tracking-widest text-center italic"
          />
          <div
            dangerouslySetInnerHTML={{ __html: log.content }}
            className="text-justify !p-0 !mb-1 !text-base"
          />
        </article>
      ))}
    </nav>
  )
}
