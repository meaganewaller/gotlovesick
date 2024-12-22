import Image from 'next/image'
import loader from "~/images/loader.webp"

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 dark:bg-neutral-950 dark:bg-opacity-90">
      <Image src={loader} alt="" />
    </div>
  );
}
